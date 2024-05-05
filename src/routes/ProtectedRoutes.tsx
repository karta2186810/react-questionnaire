import { useUser } from '@/features/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { Loading } from '@/components/elements/Loading';

export const ProtectedRoutes = () => {
  const { isLoading, user } = useUser();
  if (isLoading) return <Loading />;
  if (!user && !isLoading) return <Navigate to="/auth/login" replace={true} />;
  return <Outlet />;
};
