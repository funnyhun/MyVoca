import styled from "styled-components";

import { VocaProgressBar } from "./VocaProgressBar";

import { CheckCircleIcon, WordIcon, RightIcon } from "../../assets/iconList";
import { useSelected } from "../../hooks/useMyParam";

const Wrapper = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  background-color: ${({ theme }) => theme.main};

  padding: 1rem;
  border-radius: 0.5rem;
`;

const CompleteIcon = styled(CheckCircleIcon)`
  color: ${({ theme }) => theme.success};
`;

const IncompleteIcon = styled(WordIcon)`
  color: ${({ theme }) => theme.brand};
`;

const Status = styled.div`
  display: flex;
  align-items: center;

  background-color: ${({ $status, theme }) => ($status ? theme.success : theme.week)};

  padding: 0.75rem 0.7rem;
  border-radius: 3rem;
`;

const Label = styled.h3`
  font-size: 1rem;
`;
const Length = styled.span`
  color: ${({ theme }) => theme.label};
  font-size: 0.8rem;
`;

const Content = styled.div``;

const NextButton = styled(RightIcon)``;

export const VocaItem = ({ item }) => {
  const { id, length, done } = item;
  const { changeSelected } = useSelected();

  const navItemDetail = () => {
    changeSelected(id);
  };

  return (
    <Wrapper>
      <Status $status={done}>{done ? <CompleteIcon /> : <IncompleteIcon />}</Status>
      <Content>
        <Label>{`Day ${id + 1}`}</Label>
        <Length>{`단어 ${length}개`}</Length>
      </Content>
      <VocaProgressBar status={60} />
      <NextButton onClick={navItemDetail} />
    </Wrapper>
  );
};
