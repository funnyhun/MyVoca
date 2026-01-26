import styled from "styled-components";
import { WordItem } from "./WordItem";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const WordList = ({ wordMap }) => {
  const exp = wordMap[0];

  return (
    <Wrapper>
      {wordMap.map((item, i) => {
        return <WordItem item={item} key={i} />;
      })}
    </Wrapper>
  );
};
