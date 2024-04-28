import { useUser } from '@/features/auth';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const { isLoading, user } = useUser();
  if (isLoading) return <p>loading</p>;
  if (!user && !isLoading) return <Navigate to="/auth/login" replace={true} />;
  return <Outlet />;
};
