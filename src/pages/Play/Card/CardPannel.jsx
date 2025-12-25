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

export const CardPannel = ({ changeEvent, prevEvent, nextEvent }) => {
  return (
    <Wrapper>
      <Button label={"뒤집기"} color={"main"} bg={"success"} onClick={changeEvent} />
      <StepButtons>
        <Button
          label={
            <>
              <LeftIcon /> 이전
            </>
          }
          color="sub"
          bg="week"
          onClick={prevEvent}
        />
        <Button
          label={
            <>
              다음
              <RightIcon />
            </>
          }
          color="main"
          bg="brand"
          onClick={nextEvent}
        />
      </StepButtons>
    </Wrapper>
  );
};
