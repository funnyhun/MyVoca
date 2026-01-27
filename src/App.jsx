import { Suspense, useState, useMemo } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import styled from "styled-components";

import { Header, Navigation } from "./layout";

import { calculateDate } from "./utils/utils";

const Layout = styled.div`
  min-width: ${({ theme }) => theme.min_width};
  max-width: ${({ theme }) => theme.max_width};
  margin: 0 auto;
`;

const Wrapper = styled.div`
  // Navigation + ios-bottom-area
  height: calc(100vh - 3.5rem - env(safe-area-inset-bottom));

  background-color: ${({ theme }) => theme.background};

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding-top: calc(2.8rem + env(safe-area-inset-top));
  margin: 0 auto;

  overflow-y: auto;
`;

export const App = () => {
  const now = new Date();
  const { nick, wordMap, userData, selectedWord } = useLoaderData();

  const AppContext = useMemo(() => {
    return {
      nick,
      wordMap,
      userData,
      now,
      selectedWord,
    };
  }, [nick, wordMap, userData, now, selectedWord]);

  return (
    <Layout>
      <Header />
      <Wrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet context={AppContext} />
        </Suspense>
      </Wrapper>
      <Navigation />
    </Layout>
  );
};
