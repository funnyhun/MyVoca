import styled from "styled-components";

// icon
import { AccountIcon } from "../assets/iconList";

import { IconBox } from "../components/StyledBox";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  width: 100%;
  height: 2.8rem;

  padding: 0.3rem 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.main};
`;

const Title = styled.h1`
  line-height: 1;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.1rem;
`;

export const Header = () => {
  return (
    <Wrapper>
      <Title>MyVoca</Title>
      <IconBox>
        <AccountIcon />
      </IconBox>
    </Wrapper>
  );
};
