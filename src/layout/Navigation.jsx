import styled from "styled-components";

import { HomeIcon, PlayIcon, WordIcon } from "../assets/iconList";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.ul`
  display: flex;
  padding: 0.3rem 0rem;
`;

const Item = styled.li`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  align-items: center;

  list-style: none;
  line-height: 1;
  font-size: 0.6rem;
  font-weight: 300;
`;

export const Navigation = () => {
  const navigation = useNavigate();

  return (
    <Wrapper>
      <Item onClick={() => navigation("/home")}>
        <HomeIcon />
        <li>홈</li>
      </Item>
      <Item>
        <PlayIcon />
        <li>시작하기</li>
      </Item>
      <Item>
        <WordIcon />
        <li>단어장</li>
      </Item>
    </Wrapper>
  );
};
