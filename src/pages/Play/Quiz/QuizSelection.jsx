import { useMemo } from "react";
import styled from "styled-components";

import { Option } from "./Option";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const QuizSelection = ({ onClick, wrongs, answer, disabled }) => {
  const options = useMemo(() => {
    return [...wrongs, answer].sort(() => 0.5 - Math.random());
  }, [wrongs, answer]);

  return (
    <Wrapper>
      {options.map((label, idx) => (
        <Option
          key={`${label}-${idx}`}
          label={label}
          corrected={label === answer}
          onClick={label === answer ? onClick : undefined}
          disabled={disabled}
        />
      ))}
    </Wrapper>
  );
};
