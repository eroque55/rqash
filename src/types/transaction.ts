import { TCategory } from './category';

export type TTransaction = {
  id: string;
  name: string;
  amount: number;
  date: Date;
  category: TCategory;
};
