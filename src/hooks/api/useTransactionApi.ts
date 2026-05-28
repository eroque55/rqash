import { useMutation, useQuery } from '@tanstack/react-query';
import { parse } from 'date-fns';

import { queryKeys } from '@/constants/queryKeys';
import { transactionService } from '@/services/api/transaction';
import { TExpenseCategory } from '@/types/category';
import { TTransaction, TTransactionsFilter } from '@/types/transaction';

export const useTransactions = (type: TTransactionsFilter, limit?: number) => {
  return useQuery({
    queryKey: queryKeys.transactions.list(type, limit),
    queryFn: () => transactionService.list(type, limit),
    select: data => {
      const mappedData: TTransaction[] = data.map(transaction => ({
        id: transaction.id,
        description: transaction.description,
        amount: transaction.amount,
        date: parse(transaction.date, 'yyyy-MM-dd', new Date()),
        category: {
          colorHex: transaction.category.color_hex,
          iconUrl: transaction.category.icon_url,
          id: transaction.category.id,
          name: transaction.category.name,
        },
        type: transaction.type,
      }));

      return mappedData;
    },
  });
};

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: transactionService.create,
    meta: {
      invalidateQueries: queryKeys.transactions.all,
    },
  });
};

export const useTransactionsGroupedByCategory = () => {
  return useQuery({
    queryKey: queryKeys.transactions.groupedByCategory(),
    queryFn: transactionService.groupedByCategory,
    select: data => {
      const mappedData: TExpenseCategory[] = data.data.map(item => ({
        ammount: item.sum,
        category: {
          id: item.category.id,
          name: item.category.name,
          colorHex: item.category.color_hex,
          iconUrl: item.category.icon_url,
        },
        percentage:
          data.totalAmount > 0 ? (item.sum / data.totalAmount) * 100 : 0,
      }));

      return mappedData;
    },
  });
};
