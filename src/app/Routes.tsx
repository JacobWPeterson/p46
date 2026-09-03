import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { lazy, Suspense, type ReactElement } from 'react';

import { Workspace } from '../pages/Workspace/index';
import { E404 } from '../pages/E404/E404';

const Bibliography = lazy(async () => {
  const module = await import('../pages/Bibliography/Bibliography');
  return { default: module.Bibliography };
});

const About = lazy(async () => {
  const module = await import('../pages/About/About');
  return { default: module.About };
});

const lazyPage = (page: ReactElement): ReactElement => <Suspense fallback={null}>{page}</Suspense>;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Workspace />} />
      <Route path="folio" element={<Workspace />} />
      <Route path="folio/:folio" element={<Workspace />} />
      <Route path="bibliography" element={lazyPage(<Bibliography />)} />
      <Route path="about" element={lazyPage(<About />)} />
      <Route path="*" element={<E404 />} />
    </Route>
  )
);

export const Routes = (): ReactElement => <RouterProvider router={router} />;
