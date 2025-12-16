import { Suspense, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import styled from "styled-components";

import { useInitApp } from "./hooks/useInitApp";

import { Header, Navigation, Loading } from "./layout";
import { useWordData } from "./context/WordDataContext";

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
  const now = new Date();
  const { nick, wordMap, userData } = useLoaderData();

  return (
    <>
      <Header />
      <Wrapper>
        <Suspense>
          <Outlet context={{ nick, wordMap, userData, now }} />
        </Suspense>
      </Wrapper>
      <Navigation />
    </>
  );
};
