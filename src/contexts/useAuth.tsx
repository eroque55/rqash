import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useLogin } from '@/hooks/api/useAuthApi';
import { api } from '@/services/api';
import { TUser } from '@/types/user';
import { storage } from '@/utils/storage';
import { LoginForm } from '@/validation/login.validation';

type ContextValues = {
  user: TUser | null;
  logout: (isDelete?: boolean) => void;
  login: (user: LoginForm) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext({} as ContextValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  const { mutateAsync: loginService } = useLogin();

  const logout = () => {
    setUser(null);
    storage.clearAll();
    queryClient.clear();
  };

  const login = async (form: LoginForm) => {
    try {
      const data = await loginService(form);

      storage.set('accessToken', data.jwt);
      if (form.requestRefresh) {
        storage.set('email', form.email);
      }

      router.replace('/(main)/home');
    } catch (err) {
      logout();
      throw err;
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

    setLoading(false);
  }, []);

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.message === 'Network Error') {
        return Promise.reject(new Error('Sem conexão com a internet!'));
      }
      if (error.code === 'ERR_SECURESTORE_ENCRYPT_FAILURE') {
        logout();
        return;
      }
      return Promise.reject(error);
    },
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
