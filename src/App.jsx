import { Outlet } from "react-router-dom";
import styled from "styled-components";

// Styles
import { ThemeProvider as MyThemeProvider } from "./hooks/useTheme";
import { GlobalStyle } from "./styles/GlobalStyle";

import { Header, Navigation } from "./layout";

const Wrapper = styled.div`
  min-width: 360px;

  // Navigation + ios-bottom-area
  height: calc(100vh - 4rem - env(safe-area-inset-bottom));

  padding-top: calc(3.8rem + env(safe-area-inset-top));
  background-color: ${({ theme }) => theme.background};

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  margin: 0 auto;

  overflow-y: auto;
`;

export const App = () => {
  return (
    <MyThemeProvider>
      <GlobalStyle />
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Navigation />
    </MyThemeProvider>
  );
};
