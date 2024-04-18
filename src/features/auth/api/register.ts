import { axios } from '@/libs/axios';
import { useMutation } from '@tanstack/react-query';
import { AuthUser } from '../types';

export type RegisterDTO = {
  username: string;
  password: string;
  repeatPassword: string;
  nickname: string;
};

function register(registerDTO: RegisterDTO) {
  return axios.post<never, AuthUser>('/auth/register', registerDTO);
}

export const useRegister = () => useMutation({ mutationFn: register });
