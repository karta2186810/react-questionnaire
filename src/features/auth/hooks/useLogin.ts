import { useMutation } from '@tanstack/react-query';
import { LoginDTO, login } from '../api';
import { storage } from '@/utils/storage';
import { useUser } from '../hooks/useUser';

export const useLogin = () => {
  const { setUser } = useUser();
  return useMutation({
    mutationFn: (loginDTO: LoginDTO) => login(loginDTO),
    onSuccess({ token, username, nickname }, { rememberMe }) {
      setUser({ username, nickname });
      if (rememberMe) storage.setAuthToken(token);
    },
  });
};
