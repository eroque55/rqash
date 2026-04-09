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

import {
  useFetchUser,
  useLogin,
  useRefreshAccessToken,
} from '@/hooks/api/useAuthApi';
import { http } from '@/services/http';
import { TUser } from '@/types/user';
import { storage } from '@/utils/storage';
import { LoginForm } from '@/validation/login.validation';

type ContextValues = {
  user: TUser | null;
  logout: (isDelete?: boolean) => void;
  login: (user: LoginForm) => Promise<void>;
  loading: boolean;
  fetchUser: () => Promise<void>;
};

type Props = {
  isAppReady: boolean;
};

const AuthContext = createContext({} as ContextValues);

export const AuthProvider = ({
  children,
  isAppReady,
}: PropsWithChildren<Props>) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  const { mutateAsync: loginService } = useLogin();
  const { mutateAsync: refreshService } = useRefreshAccessToken();

  const { refetch } = useFetchUser();

  const fetchUser = async () => {
    const { data } = await refetch();

    if (data) {
      setUser(data);
    }
  };

  const logout = () => {
    setUser(null);
    storage.remove('accessToken');
    storage.remove('refreshToken');
    queryClient.clear();
  };

  const login = async (form: LoginForm) => {
    try {
      const data = await loginService(form);

      storage.set('accessToken', data.jwt);

      // if (form.requestRefresh) {
      //   storage.set('refreshToken', data.refreshToken);
      // }

      await fetchUser();

      router.replace('/(main)/home');
    } catch (err) {
      logout();
      throw err;
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = storage.getString('refreshToken');

    if (refreshToken) {
      try {
        const data = await refreshService(refreshToken);

        storage.set('accessToken', data.jwt);
        await fetchUser();

        return data.jwt;
      } catch {
        logout();
      }
    }
  };

  useEffect(() => {
    const getToken = async () => {
      await refreshAccessToken();
      setLoading(false);
    };

    getToken();
  }, []);

  useEffect(() => {
    if (!isAppReady || loading) {
      return;
    }

    SplashScreen.hideAsync();
  }, [isAppReady, loading]);

  http.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.message === 'Network Error') {
        return Promise.reject(new Error('Sem conexão com a internet!'));
      }
      if (error.code === 'ERR_SECURESTORE_ENCRYPT_FAILURE') {
        logout();
        return;
      }
      if (
        error?.response?.status === 401 &&
        originalRequest.url !== 'auth/local/refresh' &&
        !originalRequest.retry
      ) {
        originalRequest.retry = true;
        const accessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return http(originalRequest);
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
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
