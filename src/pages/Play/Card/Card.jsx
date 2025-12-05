import styled from "styled-components";

import { BorderBox } from "../../../components/StyledBox";

import { SpeakIcon } from "../../../assets/iconList";

const CustomBorderBox = styled(BorderBox)`
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
`;

const IconWrapper = styled.div`
  align-self: flex-end;

  & > svg {
    width: 2.5rem;
    height: 2.5rem;
    color: ${({ theme }) => theme.label};
  }
`;

const Content = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const Word = styled.h3`
  text-align: center;
  font-size: ${({ $length }) => `clamp(1rem, ${3.5 - $length / 8}rem, 3.5rem)`};
  font-weight: 600;
  letter-spacing: 0.2rem;
`;

const Example = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.label};
  font-size: 1rem;
  font-weight: 500;
`;

const Value = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.sub};
  font-size: 2rem;
  font-weight: 500;

  padding-top: 1rem;
`;

export const Card = ({ word, status }) => {
  return (
    <CustomBorderBox>
      <IconWrapper>
        <SpeakIcon />
      </IconWrapper>
      <Content $status={status}>
        {status === "front" ? (
          <>
            <Word $length={word.name.length}>{word.name}</Word>
            <Example>{`" ${word.exp} "`}</Example>
          </>
        ) : (
          <Value>{`${word.class}. ${word.value}`}</Value>
        )}
      </Content>
    </CustomBorderBox>
  );
};
