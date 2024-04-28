import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import { getUser } from '../api/getUser';

export function useUser() {
  const { isLoading, setIsLoading, user, setUser } = useContext(AuthContext);

  async function fetchUser() {
    try {
      setIsLoading(true);
      const user = await getUser();
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
    fetchUser,
  };
}
