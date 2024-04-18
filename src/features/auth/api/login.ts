import { axios } from '@/libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from './queries';
import { AuthUser } from '../types';
import { storage } from '@/utils/storage';

export type LoginDTO = {
  username: string;
  password: string;
  rememberMe: boolean;
};

function login(loginDTO: LoginDTO) {
  return axios.post<unknown, AuthUser>('/auth/login', loginDTO);
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (loginDTO: LoginDTO) => login(loginDTO),
    onSuccess(authUser, { rememberMe }) {
      queryClient.setQueryData<AuthUser>(authKeys.user, authUser);
      if (rememberMe) storage.setAuthUser(authUser);
    },
  });
};
