import { supabase } from '@/utils/supabase';

export const categoryService = {
  list: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select()
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    return data;
  },
};
