import { RouteObject } from 'react-router-dom';
import { DefaultLayout } from '@/components/layouts';
import { List } from './List';
import { RecycleBin } from './RecycleBin';
import { Favorites } from './Favorites';
import { Edit } from './Edit';

export const questionnaireRoutes: RouteObject[] = [
  {
    path: '/questionnaires',
    element: <DefaultLayout />,
    children: [
      {
        path: 'list',
        element: <List />,
      },
      {
        path: 'recycle-bin',
        element: <RecycleBin />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: ':id/edit',
        element: <Edit />,
      },
    ],
  },
];
