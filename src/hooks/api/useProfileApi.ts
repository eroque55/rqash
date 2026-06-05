import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/contexts/useAuth';
import { profileService } from '@/services/api/profile';

export const useUpdateProfile = () => {
  const { fetchUser } = useAuth();

  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => fetchUser(),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: profileService.changePassword,
  });
};
