import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const Wrapper = styled.div`
  min-width: 360px;

  // Navigation + ios-bottom-area
  height: calc(100vh - env(safe-area-inset-bottom));

  padding-top: calc(env(safe-area-inset-top) + 1rem);
  padding-bottom: 1rem;
  background-color: ${({ theme }) => theme.background};

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  margin: 0 auto;

  overflow-y: auto;
`;

export const Onboard = () => {
  return (
    <Wrapper>
      <Suspense>
        <Outlet />
      </Suspense>
    </Wrapper>
  );
};
