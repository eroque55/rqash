import { TIcon } from '@/components/ui/Icon';

export type TTransactionCategory = {
  id: string;
  name: string;
  color: string;
  icon: TIcon;
};

export type TTransaction = {
  id: string;
  name: string;
  amount: number;
  date: Date;
  category: TTransactionCategory;
};
