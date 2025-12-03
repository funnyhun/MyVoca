import { Outlet } from "react-router-dom";
import styled from "styled-components";

// Styles
import { ThemeProvider as MyThemeProvider } from "./hooks/useTheme";
import { GlobalStyle } from "./styles/GlobalStyle";

import { Header, Navigation } from "./layout";

const Wrapper = styled.div`
  padding-top: 3.8rem;
  padding-bottom: 4rem;
  background-color: ${({ theme }) => theme.background};

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  /* margin: 0 auto; */
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
