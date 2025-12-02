import styled from "styled-components";

// icon
import { AccountIcon } from "../assets/iconList";

import { CircleIcon } from "../components/StyledBox";

const Wrapper = styled.div`
  display: flex;
  flex: 0 0 0;
  justify-content: space-between;
  align-items: center;

  padding: 0.3rem 0rem;
`;

const Title = styled.h1`
  line-height: 1;
  font-size: 1rem;
  font-weight: 800;
`;

export const Header = () => {
  return (
    <Wrapper>
      <Title>MyVoca</Title>
      <CircleIcon>
        <AccountIcon />
      </CircleIcon>
    </Wrapper>
  );
};
