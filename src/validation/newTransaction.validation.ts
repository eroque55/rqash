import { validateDate } from '@/utils/validation';

import z from './zod';

export const NewTransactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.string(),
  description: z.string(),
  date: z.string().refine(validateDate, 'Data inválida.'),
  category: z.string(),
});

export type NewTransactionForm = z.infer<typeof NewTransactionSchema>;
