import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@/features/auth';
import { Loading } from '@/components/elements/Loading';

export const PublicRoutes = () => {
  const { isLoading, user } = useUser();

  if (isLoading) return <Loading />;
  if (user) return <Navigate to="/" replace={true} />;

  return <Outlet />;
};
