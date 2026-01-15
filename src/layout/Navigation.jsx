import styled from "styled-components";

import { useLocation, useNavigate } from "react-router-dom";

import { pages } from "../router/router";

const Wrapper = styled.ul`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;

  max-width: ${({ theme }) => theme.max_width};
  width: 100%;
  height: calc(3.5rem + env(safe-area-inset-bottom));
  background-color: ${({ theme }) => theme.main};

  display: flex;
  align-items: center;
  justify-content: space-around;

  padding-bottom: env(safe-area-inset-bottom);
  margin: 0 auto;
`;

const Item = styled.li`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;

  list-style: none;
  line-height: 1;
  font-size: 0.6rem;
  font-weight: 300;

  cursor: pointer;

  & > svg {
    color: ${({ $located, theme }) => ($located ? theme.brand : theme.sub)};
  }
`;

export const Navigation = () => {
  const navigate = useNavigate();
  const located = useLocation().pathname.split("/")[1];

  const isLocated = (path) => path.split("/")[1] === located;
  const navigatePath = (path) => {
    if (isLocated(path)) return;
    navigate(path);
  };

  return (
    <Wrapper>
      {pages.map((page) => {
        return (
          <Item
            key={page.path}
            onClick={() => navigatePath(page.path)}
            $located={isLocated(page.path)}
          >
            {page.icon}
            <p>{page.name}</p>
          </Item>
        );
      })}
    </Wrapper>
  );
};
