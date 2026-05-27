import { useQuery } from '@tanstack/react-query';
import { parse } from 'date-fns';

import { queryKeys } from '@/constants/queryKeys';
import { transactionService } from '@/services/api/transaction';
import { TTransaction, TTransactionsFilter } from '@/types/transaction';

export const useTransactions = (type: TTransactionsFilter) => {
  return useQuery({
    queryKey: queryKeys.transactions.list(type),
    queryFn: () => transactionService.list(type),
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
