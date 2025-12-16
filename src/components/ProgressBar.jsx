import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const Bar = styled.div`
  width: 100%;
  height: 1rem;

  background-color: ${({ theme }) => theme.week};
  border-radius: 1rem;
`;

const Progress = styled.div`
  z-index: 10;
  position: relative;
  top: -1.5rem;

  width: ${({ $progress }) => `${$progress}%`};
  height: 1rem;

  align-self: flex-start;

  margin-bottom: -1rem;

  background-color: ${({ theme }) => theme.brand};
  border-radius: ${({ $progress }) => ($progress === 100 ? "1rem" : "1rem 0 0 1rem")};
`;

export const ProgressBar = ({ status }) => {
  return (
    <Wrapper>
      <Bar />
      <Progress $progress={status} />
    </Wrapper>
  );
};
