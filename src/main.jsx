import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// 라우팅 진입점
import { AppRouter } from "./router/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
