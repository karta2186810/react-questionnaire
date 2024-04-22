import { useQuery } from '@tanstack/react-query';
import { axios } from '@/libs/axios';
import { AuthUser } from '../types';
import { authKeys } from './queries';

const getUser = () => axios.get<never, AuthUser>('/auth/me');

export const useUser = () => {
  return useQuery<AuthUser | null>({
    queryKey: authKeys.user,
    queryFn: getUser,
    initialData: null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
