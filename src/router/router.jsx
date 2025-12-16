import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { loadUserData } from "./loadUserData";

import { App } from "../App";

import { Onboard } from "../onboard/Onboard";
import { StepToNick } from "../onboard/StepToNick";
import { StepToData } from "../onboard/StepToData";

import { Home } from "../pages/Home/Home";
import { Play } from "../pages/Play/Play";
import { Word } from "../pages/Word/Word";

import { HomeIcon, PlayIcon, WordIcon } from "../assets/iconList";
import { loadMetaData } from "./loadMetaData";

export const pages = [
  { path: "/home", element: <Home />, name: "홈", icon: <HomeIcon /> },
  { path: "/play", element: <Play />, name: "시작하기", icon: <PlayIcon /> },
  { path: "/word", element: <Word />, name: "단어장", icon: <WordIcon /> },
];

const onboardStep = [
  { path: "/onboard/nickname", element: <StepToNick />, name: "닉네임 설정" },
  { path: "/onboard/generate-data", element: <StepToData />, loader: loadMetaData, name: "학습데이터 생성" },
];

const routes = [
  {
    path: "/",
    element: <App />,
    loader: loadUserData,
    name: "App",
    children: [{ index: true, element: <Navigate to="/home" replace /> }, ...pages],
  },
  {
    path: "/onboard",
    element: <Onboard />,
    name: "Onboard",
    children: [{ index: true, element: <Navigate to="/onboard/nickname" replace /> }, ...onboardStep],
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
];

const currentMode = import.meta.env.MODE;
const isProd = currentMode === "production";

const basename = isProd ? "/MyVoca" : "/";

export const AppRouter = () => {
  const router = createBrowserRouter(routes, { basename });
  return <RouterProvider router={router} />;
};
