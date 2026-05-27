import { useMutation } from '@tanstack/react-query';

import { storageService } from '@/services/api/storage';

export const useInsertFile = () => {
  return useMutation({
    mutationFn: storageService.insertFile,
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: storageService.deleteFile,
  });
};
