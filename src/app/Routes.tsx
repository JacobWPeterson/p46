import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import type { ReactElement } from "react";

import { Workspace } from "../pages/Workspace/index";
import { Guide } from "../pages/Guide/Guide";
import { About } from "../pages/About/About";
import { E404 } from "../pages/E404/E404";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Workspace />} />
      <Route path="guide" element={<Guide />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<E404 />} />
    </Route>,
  ),
);

export const Routes = (): ReactElement => <RouterProvider router={router} />;
