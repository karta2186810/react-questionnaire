import { storage } from '@/utils/storage';
import { useUser } from '../hooks/useUser';

export const useLogout = () => {
  const { setUser } = useUser();
  const logout = () => {
    setUser(null);
    storage.removeAuthToken();
  };

  return {
    logout,
  };
};
