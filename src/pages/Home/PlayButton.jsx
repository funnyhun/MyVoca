import styled from "styled-components";

import { BorderBox } from "../../components/StyledBox";
import { useNavigate } from "react-router-dom";

import { QuizIcon, PlayIcon } from "../../assets/iconList";

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  & > div {
    flex: 1;
  }
`;

const CustomBorderBox = styled(BorderBox)`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > h2 {
    font-size: 1rem;
    font-weight: 600;
  }

  & > svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ theme }) => theme.brand};
  }

  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const PlayButton = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <CustomBorderBox onClick={() => navigate("/play/0/card/0")}>
        <PlayIcon />
        <h2>암기하기</h2>
      </CustomBorderBox>
      <CustomBorderBox onClick={() => navigate("/play/0/quiz/0")}>
        <QuizIcon />
        <h2>퀴즈풀기</h2>
      </CustomBorderBox>
    </Wrapper>
  );
};
