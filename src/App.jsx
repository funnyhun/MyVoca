import styled from "styled-components";

import { ThemeProvider as MyThemeProvider } from "./hooks/useTheme";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
`;

export const App = () => {
  return (
    <MyThemeProvider>
      <GlobalStyle />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </MyThemeProvider>
  );
};
