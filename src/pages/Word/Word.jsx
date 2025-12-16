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
  const { wordData } = useOutletContext();

  return (
    <Wrapper>
      {wordData.map(({ label, length }) => {
        return <BorderBox>a</BorderBox>;
      })}
    </Wrapper>
  );
};
