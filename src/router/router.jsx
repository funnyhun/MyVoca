import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { loadUserData } from "./loadUserData";
import { loadPlay } from "./loadPlay";
import { loadMetaData } from "./loadMetaData";

import { App } from "../App";

import { Onboard } from "../onboard/Onboard";
import { StepToNick } from "../onboard/StepToNick";
import { StepToData } from "../onboard/StepToData";

import { Home } from "../pages/Home/Home";
import { Play, Card, Quiz } from "../pages/Play";
import { Word } from "../pages/Word/Word";

import { HomeIcon, PlayIcon, WordIcon } from "../assets/iconList";
import { WordDetail } from "../pages/Word/Detail/WordDetail";

const wordContents = [
  { index: true, element: <Word /> },
  {
    path: ":selected",
    children: [{ index: true, element: <WordDetail /> }],
  },
];

const playContents = [
  { index: true, loader: loadPlay },
  {
    path: ":selected",
    children: [
      { path: "card", element: <Navigate to="0" replace /> },
      { path: "quiz", element: <Navigate to="0" replace /> },
      { path: "card/:step", element: <Card />, name: "카드" },
      { path: "quiz/:step", element: <Quiz />, name: "퀴즈" },
    ],
  },
];

export const pages = [
  { index: true, element: <Navigate to="/home" replace /> },
  { path: "/home", element: <Home />, name: "홈", icon: <HomeIcon /> },
  {
    path: "/play",
    element: <Play />,
    name: "시작하기",
    icon: <PlayIcon />,
    children: playContents,
  },
  {
    path: "/word",
    name: "단어장",
    icon: <WordIcon />,
    children: wordContents,
  },
];

const onboardStep = [
  { index: true, element: <Navigate to="/onboard/nickname" replace /> },
  { path: "/onboard/nickname", element: <StepToNick />, name: "닉네임 설정" },
  {
    path: "/onboard/generate-data",
    element: <StepToData />,
    loader: loadMetaData,
    name: "학습데이터 생성",
  },
];

const routes = [
  {
    path: "/",
    element: <App />,
    hydrateFallbackElement: <></>,
    loader: loadUserData,
    name: "App",
    children: pages,
  },
  {
    path: "/onboard",
    element: <Onboard />,
    name: "Onboard",
    children: onboardStep,
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
