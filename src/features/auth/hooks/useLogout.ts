import { useQueryClient } from '@tanstack/react-query';
import { storage } from '@/utils/storage';
import { authKeys } from '../api/queries';

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    queryClient.setQueryData(authKeys.user, null);
    storage.removeAuthToken();
  };

  return {
    logout,
  };
};
