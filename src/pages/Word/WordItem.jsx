import styled from "styled-components";

import { WordProgressBar } from "./WordProgressBar";

import { CheckCircleIcon, WordIcon, RightIcon } from "../../assets/iconList";

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

const ItemStatus = styled.div`
  display: flex;
  align-items: center;

  background-color: ${({ $status, theme }) =>
    $status ? theme.success : theme.week};

  padding: 0.75rem 0.7rem;
  border-radius: 3rem;
`;

const ItemLabel = styled.h3`
  font-size: 1rem;
`;
const ItemLength = styled.span`
  color: ${({ theme }) => theme.label};
  font-size: 0.8rem;
`;

const ItemContent = styled.div``;

const NextButton = styled(RightIcon)``;

export const WordItem = ({ item }) => {
  const { id, length, done } = item;

  const navItemDetail = () => {
    changeStep(id);
  };

  return (
    <Wrapper>
      <ItemStatus $status={done}>
        {done ? <CompleteIcon /> : <IncompleteIcon />}
      </ItemStatus>
      <ItemContent>
        <ItemLabel>{`Day ${id}`}</ItemLabel>
        <ItemLength>{`단어 ${length}개`}</ItemLength>
      </ItemContent>
      <WordProgressBar status={60} />
      <NextButton onClick={navItemDetail} />
    </Wrapper>
  );
};
