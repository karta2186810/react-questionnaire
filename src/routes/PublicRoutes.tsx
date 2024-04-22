import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@/features/auth';

export const PublicRoutes = () => {
  const { isFetching, data: user } = useUser();

  if (isFetching) return <p>loading</p>;
  if (user) return <Navigate to="/" replace={true} />;

  return <Outlet />;
};
