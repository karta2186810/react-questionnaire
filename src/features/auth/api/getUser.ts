import { axios } from '@/libs/axios';
import { AuthUser } from '../types';

export const getUser = () => axios.get<never, AuthUser>('/auth/me');
