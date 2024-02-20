import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { UsersPage } from './pages/Users.page';
import { ViewPage } from './pages/ViewUser.page';
import { EditPage } from './pages/Edit.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/users',
    element: <UsersPage />,
  },
  {
    path: '/users/view/:id',
    element: <ViewPage />,
  },
  {
    path: '/users/edit/:id',
    element: <EditPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
