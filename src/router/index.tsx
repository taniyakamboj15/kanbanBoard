import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';


const KanbanBoard = lazy(() => import('../features/kanban/KanbanBoard').then(m => ({ default: m.KanbanBoard })));

import { ComponentLoader } from '../components/Loader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<ComponentLoader />}>
            <KanbanBoard />
          </Suspense>
        ),
      },
    ],
  },
]);
