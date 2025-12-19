import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

import { BorderBox } from "../../components/StyledBox";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 0rem 1rem;
`;

export const Word = () => {
  const { wordMap } = useOutletContext();

  console.log(wordMap);
  return (
    <Wrapper>
      {wordMap.map(({ id, length, done }) => {
        return <BorderBox>{`Day-${id} 단어 갯수 : ${length} Done : ${done}`}</BorderBox>;
      })}
    </Wrapper>
  );
};
