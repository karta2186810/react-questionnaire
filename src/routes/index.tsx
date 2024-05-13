import { useRoutes } from 'react-router-dom';
import { DefaultLayout } from '@/components/layouts';
import { PublicRoutes } from './PublicRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { Home } from '@/features/misc/routes';
import { Login, Register } from '@/features/auth';
import { managementRoutes } from '@/features/management';
import { questionnaireEditorRoutes } from '@/features/questionnaire-editor';

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
    {
      element: <ProtectedRoutes />,
      children: managementRoutes,
    },
    {
      element: <ProtectedRoutes />,
      children: questionnaireEditorRoutes,
    },
  ]);
};
