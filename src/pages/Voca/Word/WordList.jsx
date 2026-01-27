import styled from "styled-components";

import { useSelected } from "../../../hooks/useMyParam";
import { useWord } from "../../../hooks/useWord";
import { WordItem } from "./WordItem";
import { WordSearch } from "./WordSearch";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  overflow-y: auto;

  & > :first-child {
    margin-top: 1rem;
  }

  & > :last-child {
    margin-bottom: 1rem;
  }
`;

export const WordList = () => {
  const { selected } = useSelected();
  const { words } = useWord(selected);

  console.log(words);

  return (
    <Wrapper>
      <WordSearch />
      <WordItem word={words[0]} />
      {words.map((word) => {
        return <WordItem word={word} key={word.id} />;
      })}
    </Wrapper>
  );
};
