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
  const { wordMap, wordStatusMap } = useOutletContext();

  const context = useMemo(() => {
    return {
      wordMap,
      wordStatusMap,
    };
  }, [wordMap, wordStatusMap]);

  return (
    <Wrapper>
      <Outlet context={context} />
    </Wrapper>
  );
};
