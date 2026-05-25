import { TIcon } from '@/components/ui/Icon';

export type TCategory = {
  id: string;
  name: string;
  color: string;
  icon: TIcon;
};

export type TExpenseCategory = {
  id: string;
  category: TCategory;
  ammount: number;
  percentage: number;
};
