import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import { PATH } from './path';
import Layout from '@/components/Layout';
import ApiErrorBoundary from '@/components/ApiErrorBoundary';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: (
      <ApiErrorBoundary>
        <Suspense fallback={<div>로딩중...</div>}>
          <Layout />
        </Suspense>
      </ApiErrorBoundary>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: PATH.ABOUT.slice(1), element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function AppRoute() {
  return <RouterProvider router={router} />;
}
