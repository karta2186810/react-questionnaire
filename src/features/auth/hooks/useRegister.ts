import { useMutation } from '@tanstack/react-query';
import { register } from '../api';

export const useRegister = () => useMutation({ mutationFn: register });
