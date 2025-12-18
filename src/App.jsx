import { Suspense, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import styled from "styled-components";

import { Header, Navigation } from "./layout";

import { calculateDate } from "./utils/utils";

const Wrapper = styled.div`
  min-width: 360px;

  // Navigation + ios-bottom-area
  height: calc(100vh - 4.5rem - env(safe-area-inset-bottom));

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
  const [selectedDay, setSelectedDay] = useState(calculateDate(now, userData.startedTime));

  return (
    <>
      <Header />
      <Wrapper>
        <Suspense>
          <Outlet context={{ nick, wordMap, userData, now, selectedDay }} />
        </Suspense>
      </Wrapper>
      <Navigation />
    </>
  );
};
