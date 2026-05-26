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
    const { data: createUserData, error: createUserError } =
      await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

    if (createUserError) {
      throw createUserError;
    }

    await authService.login({
      email: form.email,
      password: form.password,
      requestRefresh: false,
    });

    const { error: createClientError } = await supabase.from('clients').insert({
      user_id: createUserData.user?.id,
      name: form.name,
    });

    if (createClientError) {
      await supabase.auth.admin.deleteUser(createUserData.user?.id || '');
      await authService.logout();
      throw createClientError;
    }
  },
};
