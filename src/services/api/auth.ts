/* eslint-disable require-await */
import { TLoginResponse } from '@/types/user';
import { LoginForm } from '@/validation/login.validation';

// const BASE_URL = '/auth';

export const authService = {
  login: async (form: LoginForm): Promise<TLoginResponse> => {
    // const { data } = await api.post<TLoginResponse>(`${BASE_URL}/local`, form);
    // return data;

    return {
      jwt: 'fake-jwt-token',
      user: {
        id: '1',
        email: form.email,
      },
    };
  },
};
