import styled from "styled-components";

import { Button } from "../../../components/Button.jsx";

const Wrapper = styled.div`
  padding-top: 1rem;

  & p {
    line-height: 1.5;
  }
`;

export const CardPannel = ({ changeEvent }) => {
  return (
    <Wrapper>
      <Button label={"뒤집기"} color={"main"} bg={"success"} onClick={changeEvent} />
    </Wrapper>
  );
};
