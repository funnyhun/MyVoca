import styled from "styled-components";
import { ProgressBar } from "../../components/ProgressBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const Step = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  color: ${({ theme }) => theme.label};
`;

export const PlayProgressBar = ({ total, done }) => {
  return (
    <Wrapper>
      <Step>{`${done} / ${total}`}</Step>
      <ProgressBar status={(done / total) * 100} />
    </Wrapper>
  );
};
