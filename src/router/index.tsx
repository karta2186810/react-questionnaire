import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '@/components/layouts';
import { Home } from '@/features/misc/routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);
