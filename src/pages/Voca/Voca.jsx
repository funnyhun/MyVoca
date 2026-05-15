import styled from "styled-components";
import { useMemo } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 0rem 1rem;
`;

export const Voca = () => {
  const parentContext = useOutletContext();

  const context = useMemo(() => {
    return {
      ...parentContext,
    };
  }, [parentContext]);

  return (
    <Wrapper>
      <Outlet context={context} />
    </Wrapper>
  );
};
