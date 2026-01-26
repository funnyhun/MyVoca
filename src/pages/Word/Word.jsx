import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

import { WordList } from "./WordList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 0rem 1rem;
`;

export const Word = () => {
  const { wordMap } = useOutletContext();

  return (
    <Wrapper>
      <WordList wordMap={wordMap} />
    </Wrapper>
  );
};
