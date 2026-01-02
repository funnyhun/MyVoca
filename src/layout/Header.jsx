import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// icon
import { AccountIcon } from "../assets/iconList";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  max-width: ${({ theme }) => theme.max_width};
  width: 100%;
  height: calc(2.8rem + env(safe-area-inset-top));

  padding-top: calc(env(safe-area-inset-top) - 0.5rem);
  padding-left: 1rem;
  padding-right: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.main};
  margin: 0 auto;
`;

const Title = styled.h1`
  line-height: 1;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.1rem;

  cursor: pointer;
`;

export const Header = () => {
  const navigation = useNavigate();

  const navHome = () => navigation("/home");

  return (
    <Wrapper>
      <Title onClick={navHome}>MyVoca</Title>
      <AccountIcon />
    </Wrapper>
  );
};
