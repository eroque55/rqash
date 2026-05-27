import { validateDate } from '@/utils/validation';

import z from './zod';

export const NewTransactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.string().refine(value => {
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    return !isNaN(numericValue) && numericValue > 0;
  }, 'Valor deve ser um número positivo.'),
  description: z.string().min(1),
  date: z.string().min(1).refine(validateDate, 'Data inválida.'),
  category: z.uuid().min(1),
});

export type NewTransactionForm = z.infer<typeof NewTransactionSchema>;
