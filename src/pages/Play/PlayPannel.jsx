import styled from "styled-components";
import { LeftIcon, RightIcon } from "../../assets/iconList";
import { Button } from "../../components/Button";

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;

  padding-top: 1rem;
`;

export const PlayPannel = ({ prevEvent, nextEvent }) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};
