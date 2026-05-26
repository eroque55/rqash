import { useMutation } from '@tanstack/react-query';

import { authService } from '@/services/api/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: authService.logout,
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: authService.createUser,
  });
};
