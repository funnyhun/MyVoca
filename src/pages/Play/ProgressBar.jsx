import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const Step = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.label};
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

  align-self: flex-start;

  width: ${({ $progress }) => `${$progress}%`};
  height: 1rem;

  background-color: ${({ theme }) => theme.brand};
  border-radius: ${({ $progress }) => ($progress === 100 ? "1rem" : "1rem 0 0 1rem")};
`;

export const ProgressBar = ({ total, done }) => {
  return (
    <Wrapper>
      <Step>{`${done} / ${total}`}</Step>
      <Bar />
      <Progress $progress={(done / total) * 100} />
    </Wrapper>
  );
};
