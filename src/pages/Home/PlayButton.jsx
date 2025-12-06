import styled from "styled-components";

import { BorderBox } from "../../components/StyledBox";
import { useNavigate } from "react-router-dom";

import { QuizIcon } from "../../assets/iconList";

const Wrapper = styled.div``;

const CustomBorderBox = styled(BorderBox)`
  & > h2 {
    font-size: 1rem;
    font-weight: 600;
  }
  & > svg {
    color: ${({ theme }) => theme.brand};
  }
`;

export const PlayButton = () => {
  const navigation = useNavigate();

  const onClick = () => {
    navigation("/play");
  };

  return (
    <Wrapper onClick={onClick}>
      <CustomBorderBox>
        <QuizIcon />
        <h2>퀴즈 풀기</h2>
      </CustomBorderBox>
    </Wrapper>
  );
};
