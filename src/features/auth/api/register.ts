import { axios } from '@/libs/axios';
import { useMutation } from '@tanstack/react-query';

export type RegisterDTO = {
  username: string;
  password: string;
  repeatPassword: string;
  nickname: string;
};

export type RegisterResponse = {
  success: boolean;
};

function register(registerDTO: RegisterDTO) {
  return axios.post<never, RegisterResponse>('/auth/register', registerDTO);
}

export const useRegister = () => useMutation({ mutationFn: register });
