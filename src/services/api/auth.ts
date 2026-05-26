import { TUser } from '@/types/user';
import { supabase } from '@/utils/supabase';
import { LoginForm } from '@/validation/login.validation';
import { SignUpForm } from '@/validation/signUp.validation';

export const authService = {
  login: async (form: LoginForm) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      throw error;
    }

    return data;
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  },

  createUser: async (form: SignUpForm) => {
    const { error: createUserError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.name,
        },
      },
    });

    if (createUserError) {
      throw createUserError;
    }

    await authService.login({
      email: form.email,
      password: form.password,
      requestRefresh: false,
    });
  },

  fetchUser: async (): Promise<TUser | null> => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      return null;
    }

    const { data: clientData, error: clientError } = await supabase
      .from('profiles')
      .select()
      .single();

    if (clientError) {
      throw clientError;
    }

    return {
      id: clientData.id,
      name: clientData.name,
      email: clientData.email,
      avatarUrl: clientData.avatar_url,
      createdAt: clientData.created_at,
    };
  },
};
