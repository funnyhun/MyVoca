import styled from "styled-components";

import { CheckCircleIcon, CircleIcon, MoreVIcon } from "../../../assets/iconList";

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  background-color: ${({ theme }) => theme.main};

  padding: 1rem;
  border-radius: 0.5rem;
`;

const CompleteIcon = styled(CheckCircleIcon)`
  color: ${({ theme }) => theme.main};
`;

const InCompleteIcon = styled(CircleIcon)`
  color: ${({ theme }) => theme.label};
`;

const Status = styled.div`
  display: flex;
  align-items: center;

  background-color: ${({ $status, theme }) => ($status ? theme.brand : theme.sub)};

  padding: 0.75rem 0.7rem;
  border-radius: 3rem;
`;

const Label = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;

const Explain = styled.span`
  color: ${({ theme }) => theme.label};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 0.3rem;

  margin-left: 0.5rem;
`;

const MoreButton = styled(MoreVIcon)`
  margin-left: auto;
`;

export const WordItem = ({ word }) => {
  const { word: label, definitions, done } = word;

  return (
    <Wrapper>
      <Status $status={done}>{done ? <CompleteIcon /> : <InCompleteIcon />}</Status>
      <Content>
        <Label>{label}</Label>
        <Explain>{`${definitions[0].class}.${definitions[0].value}`}</Explain>
      </Content>
      <MoreButton />
    </Wrapper>
  );
};
