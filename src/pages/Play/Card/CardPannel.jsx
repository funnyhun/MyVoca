import styled from "styled-components";

import { Button } from "../../../components/Button.jsx";

import { LeftIcon, RightIcon } from "../../../assets/iconList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding-top: 1rem;

  & p {
    line-height: 1.5;
  }
`;

const StepButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const PrevIcon = styled(LeftIcon)`
  width: 1.2rem;
  height: 1.2rem;
  margin-left: -0.5rem;
`;

const NextIcon = styled(RightIcon)`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: -0.5rem;
`;

export const CardPannel = ({ changeEvent, prevEvent, nextEvent }) => {
  const buttonLabels = {
    left: (
      <>
        <PrevIcon />
        이전
      </>
    ),
    right: (
      <>
        다음
        <NextIcon />
      </>
    ),
  };

  return (
    <Wrapper>
      <Button label={"뒤집기"} color={"main"} bg={"success"} onClick={changeEvent} />
      <StepButtons>
        <Button label={buttonLabels.left} color="main" bg="brand" onClick={prevEvent} />
        <Button label={buttonLabels.right} color="main" bg="brand" onClick={nextEvent} />
      </StepButtons>
    </Wrapper>
  );
};
