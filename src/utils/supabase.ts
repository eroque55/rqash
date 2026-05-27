import { createClient } from '@supabase/supabase-js';

import { Database } from '@/types/database.types';
import { storage } from '@/utils/storage';

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      storage: {
        getItem: key => {
          return storage.getString(key) || null;
        },
        setItem: (key, value) => {
          storage.set(key, value);
        },
        removeItem: key => {
          storage.remove(key);
        },
      },
      autoRefreshToken: true,
      persistSession: false,
      detectSessionInUrl: false,
    },
  },
);
