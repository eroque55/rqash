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

import { useLogin } from '@/hooks/api/useAuthApi';
import { TUser } from '@/types/user';
import { storage } from '@/utils/storage';
import { supabase } from '@/utils/supabase';
import { LoginForm } from '@/validation/login.validation';

type ContextValues = {
  user: TUser | null;
  logout: () => Promise<void>;
  login: (user: LoginForm) => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext({} as ContextValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { mutateAsync: loginService } = useLogin();

  const logout = async () => {
    setUser(null);
    storage.clearAll();
    queryClient.clear();
    await supabase.auth.signOut();
  };

  const login = async (form: LoginForm) => {
    try {
      const data = await loginService(form);

      storage.set('accessToken', data.session.access_token);

      if (form.requestRefresh) {
        storage.set('refreshToken', data.session.refresh_token);
      }

      router.replace('/(main)/home');
    } catch {
      await logout();
    }
  };

  useEffect(() => {
    const email = storage.getString('email');

    if (email) {
      setUser({
        id: '1',
        email,
      });
    }

    SplashScreen.hideAsync();
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
