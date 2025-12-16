import styled from "styled-components";

import { BorderBox, BoxGroup } from "../../components/StyledBox";

const Title = styled.h2`
  line-height: 1;
  font-size: 1rem;
  color: ${({ theme }) => theme.sub};
`;

const Content = styled.p`
  font-size: 1.25rem;
  font-weight: 900;
`;

export const UserDataSection = ({ userData }) => {
  const { today, learned } = userData;

  console.log(today, learned);

  return (
    <BoxGroup>
      <BorderBox>
        <Title>오늘 학습한 단어</Title>
        <Content>{today}</Content>
      </BorderBox>
      <BorderBox>
        <Title>총 암기한 단어</Title>
        <Content>{learned}</Content>
      </BorderBox>
    </BoxGroup>
  );
};
