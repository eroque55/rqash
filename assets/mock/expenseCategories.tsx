import { TExpenseCategory } from '@/types/category';

import { mockCategories } from './transactions';

export const mockExpenseCategories: TExpenseCategory[] = [
  {
    id: '1',
    category: mockCategories[0],
    ammount: -150,
    percentage: 30,
  },
  {
    id: '2',
    category: mockCategories[1],
    ammount: -100,
    percentage: 20,
  },
  {
    id: '3',
    category: mockCategories[2],
    ammount: -50,
    percentage: 10,
  },
];
