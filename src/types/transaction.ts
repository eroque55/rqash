import { TCategory } from './category';

export type TTransactionType = 'income' | 'expense';

export type TTransaction = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: TCategory;
  type: TTransactionType;
};

export type TTransactionsFilter = TTransactionType | 'all';
