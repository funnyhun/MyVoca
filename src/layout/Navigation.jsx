import styled from "styled-components";

import { useLocation, useNavigate } from "react-router-dom";

import { pages } from "../router/router";

const Wrapper = styled.ul`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;

  width: 100%;
  height: calc(3rem + env(safe-area-inset-bottom));
  background-color: ${({ theme }) => theme.main};

  display: flex;
  align-items: center;
  justify-content: space-around;

  padding-bottom: env(safe-area-inset-bottom);
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;

  list-style: none;
  line-height: 1;
  font-size: 0.6rem;
  font-weight: 300;

  & > svg {
    color: ${({ $located, theme }) => ($located ? theme.brand : theme.sub)};
  }
`;

export const Navigation = () => {
  const navigation = useNavigate();
  const located = useLocation().pathname;

  return (
    <Wrapper>
      {pages.map((page) => {
        return (
          <Item key={page.path} onClick={() => navigation(page.path)} $located={located === page.path}>
            {page.icon}
            <p>{page.name}</p>
          </Item>
        );
      })}
    </Wrapper>
  );
};
