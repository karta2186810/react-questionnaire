import { useUser } from '@/features/auth';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const { isFetching, data: user } = useUser();
  if (isFetching) return <p>loading</p>;
  if (!user) return <Navigate to="/auth/login" replace={true} />;

  return <Outlet />;
};
