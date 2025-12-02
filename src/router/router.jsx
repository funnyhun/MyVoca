import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { App } from "../App";

const routes = [
  {
    path: "/",
    element: <App />,
    name: "App",
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export const AppRouter = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};
