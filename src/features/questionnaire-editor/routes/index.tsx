import { RouteObject } from 'react-router-dom';
import { Edit } from './Edit';

export const questionnaireEditorRoutes: RouteObject[] = [
  {
    path: '/questionnaires/:id/edit',
    element: <Edit />,
  },
];
