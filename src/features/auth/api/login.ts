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

export type LoginResponse = {
  token: string;
  username: string;
  nickname: string;
};

function login(loginDTO: LoginDTO) {
  return axios.post<unknown, LoginResponse>('/auth/login', loginDTO);
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (loginDTO: LoginDTO) => login(loginDTO),
    onSuccess({ token, username, nickname }, { rememberMe }) {
      queryClient.setQueryData<AuthUser>(authKeys.user, { username, nickname });
      if (rememberMe) storage.setAuthToken(token);
    },
  });
};
