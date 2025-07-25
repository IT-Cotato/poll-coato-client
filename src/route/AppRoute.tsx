import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { PATH } from './path';
import Layout from '@/components/Layout';
import ApiErrorBoundary from '@/components/ApiErrorBoundary';
import AdminRoute from './require/AdminRoute';
import UserRoute from './require/UserRoute';
import { Vote, Result, Admin, NotFound, Home } from '@/pages';
import SuspenseFallback from '@/components/SuspenseFallback';

const createAuthRouter = (
  routeType: 'ADMIN' | 'USER',
  children: RouteObject[],
): RouteObject[] => [
  {
    element: routeType === 'ADMIN' ? <AdminRoute /> : <UserRoute />,
    children,
  },
];

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: (
      <ApiErrorBoundary>
        <Suspense fallback={<SuspenseFallback />}>
          <Layout />
        </Suspense>
      </ApiErrorBoundary>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: PATH.POLL, element: <Home /> },
      //user 기능
      ...createAuthRouter('USER', [
        { path: PATH.VOTE, element: <Vote /> },
        { path: PATH.RESULT, element: <Result /> },
      ]),
      //admin 기능
      ...createAuthRouter('ADMIN', [{ path: PATH.ADMIN, element: <Admin /> }]),
      //not found
      { path: '*', element: <NotFound /> },
    ],
  },
] as RouteObject[]);

export default function AppRoute() {
  return <RouterProvider router={router} />;
}
