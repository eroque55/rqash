import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useFetchUser, useLogin } from '@/hooks/api/useAuthApi';
import { TUser } from '@/types/user';
import { storage } from '@/utils/storage';
import { supabase } from '@/utils/supabase';
import { LoginForm } from '@/validation/login.validation';

type ContextValues = {
  user: TUser | null;
  logout: () => Promise<void>;
  login: (user: LoginForm) => Promise<void>;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
};

const AuthContext = createContext({} as ContextValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { mutateAsync: loginService } = useLogin();
  const { mutateAsync: fetchUserService } = useFetchUser();

  const logout = async () => {
    setUser(null);
    storage.clearAll();
    queryClient.clear();
    await supabase.auth.signOut();
  };

  const fetchUser = async () => {
    try {
      const userData = await fetchUserService();

      setUser(userData);
    } catch {
      await logout();
    }
  };

  const login = async (form: LoginForm) => {
    try {
      const data = await loginService(form);

      storage.set('accessToken', data.session.access_token);

      if (form.requestRefresh) {
        storage.set('refreshToken', data.session.refresh_token);
      }

      await fetchUser();
      router.replace('/(main)/home');
    } catch {
      await logout();
    }
  };

  useEffect(() => {
    const restoreSession = async () => {
      const access_token = storage.getString('accessToken');
      const refresh_token = storage.getString('refreshToken');

      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          await logout();
          return;
        }
      }

      await fetchUser();
      await SplashScreen.hideAsync();
      setIsLoading(false);
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        isLoading,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
