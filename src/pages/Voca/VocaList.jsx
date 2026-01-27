import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

import { VocaItem } from "./VocaItem";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding-top: 0rem 1rem;

  overflow-y: auto;

  & > :first-child {
    margin-top: 1rem;
  }

  & > :last-child {
    margin-bottom: 1rem;
  }
`;

export const VocaList = () => {
  const { wordMap } = useOutletContext();

  return (
    <Wrapper>
      {wordMap.map((item, i) => {
        return <VocaItem item={item} key={i} />;
      })}
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
      <VocaItem item={wordMap[0]} />
    </Wrapper>
  );
};
