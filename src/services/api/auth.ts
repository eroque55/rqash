import { TUser } from '@/types/user';
import { LoginForm } from '@/validation/login.validation';

const BASE_URL = '/auth';

export const authService = {
  login: async (form: LoginForm) => {
    // const { data } = await http.post<TLoginResponse>(`${BASE_URL}/local`, form);
    // return data;

    return {
      jwt: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
      user: {
        id: 1,
        documentId: '1',
        email: form.identifier,
      },
    };
  },

  refreshAccessToken: async (refreshToken: string) => {
    // const { data } = await http.post<TLoginResponse>(
    //   `${BASE_URL}/refresh-token`,
    //   {
    //     refreshToken,
    //   },
    // );
    // return data;

    return {
      jwt: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
      user: {
        id: 1,
        documentId: '1',
        email: 'mockuser@example.com',
      },
    };
  },

  fetchUser: async (): TUser => {
    // const { data } = await http.get<TUser>(`${BASE_URL}/me`);
    // return data;

    return {
      id: 1,
      documentId: '1',
      name: 'Mock User',
    };
  },
};
