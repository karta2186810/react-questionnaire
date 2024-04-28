import { axios } from '@/libs/axios';

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

export function login(loginDTO: LoginDTO) {
  return axios.post<unknown, LoginResponse>('/auth/login', loginDTO);
}
