import { useMemo, Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { useWord } from "../../hooks/useWord";
import { useStep, useSelected } from "../../hooks/useMyParam";

import { shuffleArray } from "../../utils/initAppData";

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 1rem 1rem;
`;

export const Play = () => {
  const { selected } = useSelected();
  const { words } = useWord(selected);
  const { step } = useStep();

  const context = useMemo(() => {
    return {
      words,
      quizs: shuffleArray([...words]).filter((w) => w.done === false),
    };
  }, [selected, words.length]); // Re-calculate only when day changes or words are loaded/changed in count

  return (
    <Wrapper>
      <Suspense fallback={<div>불러올 단어가 없습니다.</div>}>
        <Outlet key={step} context={context} />
      </Suspense>
    </Wrapper>
  );
};
