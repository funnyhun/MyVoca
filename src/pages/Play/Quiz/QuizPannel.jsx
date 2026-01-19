import styled from "styled-components";

import { CircleTimer } from "./CircleTimer";
import { SmallButton } from "../../../components/Button";

import { RightIcon, CheckCircleIcon } from "../../../assets/iconList";

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.max_width};
  min-width: ${({ theme }) => theme.min_width};
  width: 100%;
  height: 3.8rem;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  background-color: ${({ theme }) => theme.main};

  margin: 0 auto;
  padding: 0.5rem 1rem;
`;

const Text = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;

  margin-right: 6rem;
`;

const CheckIcon = styled(CheckCircleIcon)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.week_success};
`;

const Content = styled.span`
  display: flex;
  align-items: center;
  gap: 0.1rem;

  color: ${({ theme }) => theme.week_success};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.label};
  font-size: 0.7rem;
`;

const NextIcon = styled(RightIcon)`
  margin-right: -1rem;
`;

export const QuizPannel = ({ disable }) => {
  return (
    <Wrapper>
      <CircleTimer max={3} />
      <Text>
        <Content>
          <CheckIcon />
          정답입니다!
        </Content>
        <Label>3초 뒤 자동으로 전환</Label>
      </Text>
      <SmallButton
        label={
          <>
            다음
            <NextIcon />
          </>
        }
        color="main"
        bg="brand"
      />
    </Wrapper>
  );
};
