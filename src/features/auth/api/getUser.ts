import { useQuery } from '@tanstack/react-query';
import { axios } from '@/libs/axios';
import { storage } from '@/utils/storage';
import { AuthUser } from '../types';
import { authKeys } from './queries';

const getUser = () => axios.get<never, AuthUser>('/auth/me');

export const useUser = () => {
  const query = useQuery<AuthUser | null>({
    queryKey: authKeys.user,
    queryFn: () => getUser(),
    initialData: storage.getAuthUser(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};
