import { axios } from '@/libs/axios';

export type RegisterDTO = {
  username: string;
  password: string;
  repeatPassword: string;
  nickname: string;
};

export type RegisterResponse = {
  success: boolean;
};

export function register(registerDTO: RegisterDTO) {
  return axios.post<never, RegisterResponse>('/auth/register', registerDTO);
}
