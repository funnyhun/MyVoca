import { Outlet } from "react-router-dom";
import styled from "styled-components";

// Styles
import { ThemeProvider as MyThemeProvider } from "./hooks/useTheme";
import { GlobalStyle } from "./styles/GlobalStyle";

import { Header, Navigation } from "./layout";

const Wrapper = styled.div`
  max-width: 360px;
  background-color: ${({ theme }) => theme.background};

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 0rem 1rem;
  margin: 0 auto;
`;

export const App = () => {
  return (
    <MyThemeProvider>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <Outlet />
        <Navigation />
      </Wrapper>
    </MyThemeProvider>
  );
};
