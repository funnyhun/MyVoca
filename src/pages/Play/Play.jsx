import { useMemo, Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { useWord } from "../../hooks/useWord";
import { useStep } from "../../hooks/useMyParam";

import { shuffleArray } from "../../utils/initAppData";

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 1rem 1rem;
`;

export const Play = () => {
  const { words } = useWord();
  const { step } = useStep();

  const context = useMemo(() => {
    return {
      words,
      quizs: shuffleArray(words).filter((w) => w.done === false),
    };
  }, [words]);

  return (
    <Wrapper>
      <Suspense fallback={<div>불러올 단어가 없습니다.</div>}>
        <Outlet key={step} context={context} />
      </Suspense>
    </Wrapper>
  );
};
