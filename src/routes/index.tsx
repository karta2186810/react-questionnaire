import { useRoutes } from 'react-router-dom';
import { DefaultLayout } from '@/components/layouts';
import { Home } from '@/features/misc/routes';
import { Login, Register } from '@/features/auth';
import { PublicRoutes } from './PublicRoutes';

export const AppRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
      ],
    },
    {
      path: '/auth',
      element: <DefaultLayout />,
      children: [
        {
          path: '',
          element: <PublicRoutes />,
          children: [
            {
              path: 'login',
              element: <Login />,
            },
            {
              path: 'register',
              element: <Register />,
            },
          ],
        },
      ],
    },
  ]);
};
