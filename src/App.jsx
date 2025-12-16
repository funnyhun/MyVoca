import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { useInitApp } from "./hooks/useInitApp";

// Styles
import { ThemeProvider as MyThemeProvider } from "./hooks/useTheme";
import { GlobalStyle } from "./styles/GlobalStyle";

import { Header, Navigation, Loading } from "./layout";

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
  const { words, isLoading } = useInitApp();
  const now = new Date();

  console.log(now);

  return (
    <MyThemeProvider>
      <GlobalStyle />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Wrapper>
            <Outlet context={{ words: words[0], now }} />
          </Wrapper>
          <Navigation />
        </>
      )}
    </MyThemeProvider>
  );
};
