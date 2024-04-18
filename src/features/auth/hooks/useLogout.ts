import { useQueryClient } from '@tanstack/react-query';
import { storage } from '@/utils/storage';
import { AUTH_USER_QUERY_KEY } from '../api/getUser';

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    queryClient.setQueryData(AUTH_USER_QUERY_KEY, null);
    storage.removeAuthUser();
  };

  return {
    logout,
  };
};
