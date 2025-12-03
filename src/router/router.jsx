import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { App } from "../App";
import { Home } from "../pages/Home/Home";
import { HomeIcon, PlayIcon, WordIcon } from "../assets/iconList";

export const pages = [
  { path: "/home", element: <Home />, name: "홈", icon: <HomeIcon /> },
  { path: "/play", element: <Home />, name: "시작하기", icon: <PlayIcon /> },
  { path: "/word", element: <Home />, name: "단어장", icon: <WordIcon /> },
];

const routes = [
  {
    path: "/",
    element: <App />,
    name: "App",
    children: pages,
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
];

export const AppRouter = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};
