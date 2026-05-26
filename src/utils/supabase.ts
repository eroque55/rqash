import { createClient } from '@supabase/supabase-js';

import { storage } from '@/utils/storage';

export const supabase = createClient(
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
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
