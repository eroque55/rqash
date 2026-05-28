import { format, parse } from 'date-fns';

import { TTransactionsFilter } from '@/types/transaction';
import { supabase } from '@/utils/supabase';
import { NewTransactionForm } from '@/validation/newTransaction.validation';

export const transactionService = {
  list: async (type: TTransactionsFilter) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, category:categories(*)')
      .match(type === 'all' ? {} : { type })
      .order('date', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  },

  create: async (form: NewTransactionForm) => {
    const amount = parseFloat(form.amount);
    const parsedDate = parse(form.date, 'dd/MM/yyyy', new Date());
    const date = format(parsedDate, 'yyyy-MM-dd');

    const { data, error } = await supabase.from('transactions').insert({
      type: form.type,
      description: form.description,
      category_id: form.category,
      amount,
      date,
    });

    if (error) {
      throw error;
    }

    return data;
  },
};
