import { useQuery } from '@tanstack/react-query';
import { axios } from '@/libs/axios';
import { storage } from '@/utils/storage';
import { AuthUser } from '../types';

export const AUTH_USER_QUERY_KEY = ['authUser'];

const getUser = () => axios.get<never, AuthUser>('/auth/me');

export const useUser = () => {
  const query = useQuery<AuthUser | null>({
    queryKey: AUTH_USER_QUERY_KEY,
    queryFn: () => getUser(),
    initialData: storage.getAuthUser(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};
