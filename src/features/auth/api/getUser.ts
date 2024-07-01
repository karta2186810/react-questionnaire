import { axios } from '@/libs/axios';
import { AuthUser } from '../types';

export const getUser = () => axios.post<never, AuthUser>('/auth/me');
