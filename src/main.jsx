import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppRouter } from "./router/router";

import { ThemeProvider as MyThemeProvider } from "./hooks/useTheme";
import { GlobalStyle } from "./styles/GlobalStyle";

import { WordDataProvider } from "./context/WordDataContext";

createRoot(document.getElementById("root")).render(
  //   <StrictMode>
  <MyThemeProvider>
    <GlobalStyle />
    <WordDataProvider>
      <AppRouter />
    </WordDataProvider>
  </MyThemeProvider>
  //   </StrictMode>
);
