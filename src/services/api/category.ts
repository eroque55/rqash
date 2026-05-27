import { supabase } from '@/utils/supabase';

export const categoryService = {
  list: async () => {
    const { data, error } = await supabase.from('categories').select();

    if (error) {
      throw error;
    }

    return data;
  },
};
