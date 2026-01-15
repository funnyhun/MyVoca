import styled from "styled-components";

import { Option } from "./Option";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const QuizPannel = ({ onClick, wrongs, answer }) => {
  const options = [...wrongs, answer];

  return (
    <Wrapper>
      {options.map((label) => (
        <Option
          key={label}
          label={label}
          corrected={label === answer}
          onClick={label === answer && onClick}
        />
      ))}
    </Wrapper>
  );
};
