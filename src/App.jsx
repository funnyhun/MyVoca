import { Suspense, useState } from "react";
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

  padding-top: calc(3.8rem + env(safe-area-inset-top));
  background-color: ${({ theme }) => theme.background};

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  margin: 0 auto;

  overflow-y: auto;

  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const validate = (max, selected) => (selected < max ? selected : max - 1);

export const App = () => {
  const now = new Date();
  const { nick, wordMap, userData } = useLoaderData();
  const [selectedDay, setSelectedDay] = useState(
    validate(wordMap.length, calculateDate(now, userData.startedTime))
  );

  return (
    <Layout>
      <Header />
      <Wrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet context={{ nick, wordMap, userData, now, selectedDay }} />
        </Suspense>
      </Wrapper>
      <Navigation />
    </Layout>
  );
};
