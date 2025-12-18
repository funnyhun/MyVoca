import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { HiIcon } from "../assets/iconList";

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;

  padding: 0rem 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Image = styled.div`
  width: 10rem;
  height: 10rem;

  background-color: ${({ theme }) => theme.week};
  border-radius: 5rem;
`;

const Greet = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & > p {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
  }
`;

const CustomHiIcon = styled(HiIcon)`
  width: 2rem;
  height: 2rem;

  color: ${({ theme }) => theme.brand};
`;

const Content = styled.p`
  color: ${({ theme }) => theme.label};
  text-align: center;
  line-height: 1.7;
`;

export const StepToNick = () => {
  const navigate = useNavigate();
  const [nick, setNick] = useState("");

  const submitNick = () => {
    // 유효성 검사 생략
    window.localStorage.setItem("nick", nick);
    navigate("/onboard/generate-data");
  };

  return (
    <Wrapper>
      <Header>
        <Image />
        <Greet>
          <p>반가워요!</p>
          <CustomHiIcon />
        </Greet>
        <Content>
          나만의 단어장 MyVoca를 시작하기전,
          <br />
          멋진 닉네임을 정해주세요.
        </Content>
      </Header>
      <Input
        label="닉네임"
        value={nick}
        onChange={(e) => {
          setNick(e.target.value);
        }}
        notice="한글, 영문, 숫자 포함 2~10 자로 입력해주세요."
      />
      <Button label="다음으로" color="main" bg="brand" onClick={submitNick} />
    </Wrapper>
  );
};
