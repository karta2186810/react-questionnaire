import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '@/components/layouts';
import { Home } from '@/features/misc/routes';
import { Login, Register } from '@/features/auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/register',
        element: <Register />,
      },
    ],
  },
]);
