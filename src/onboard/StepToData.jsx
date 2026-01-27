import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { ProgressBar } from "../components/ProgressBar";
import { initAppData } from "../utils/initAppData";
import { VerticalButton } from "../components/Button";

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding-top: 2rem;
`;

const Image = styled.div`
  width: 10rem;
  height: 10rem;

  background-color: ${({ theme }) => theme.week};
  border-radius: 5rem;
`;

const Greet = styled.p`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.1rem;

  white-space: pre-line;
`;

const Content = styled.p`
  color: ${({ theme }) => theme.label};
  text-align: center;
  line-height: 1.7;

  white-space: pre-line;
`;

const ProgressUI = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0rem 0.2rem;
`;

const ProgressTitle = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.brand};
`;

const ProgressStatus = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.font};
`;

export const StepToData = () => {
  const navigate = useNavigate();
  const nick = window.localStorage.getItem("nick");
  const { length } = useLoaderData();

  const [status, setStatus] = useState(0);

  const startApp = () => {
    navigate("/home");
  };

  useEffect(() => {
    const bundleSize = Math.ceil(length / Math.ceil(length / 30));

    initAppData(length, bundleSize, setStatus);
  }, []);

  const greet = status !== 100 ? "나만의 단어장을\n만드는 중..." : "나만의 단어장을\n완성했어요 !";
  const content =
    status !== 100
      ? `${nick} 님의 학습 데이터를 구성하고 있어요.\n잠시만 기다려주세요.`
      : `${nick} 님의 맞춤 단어장을 완성했어요.\nMyVoca를 시작할까요?`;

  return (
    <Wrapper>
      <Header>
        <Image />
        <Greet>{greet}</Greet>
        <Content>{content}</Content>
      </Header>
      <ProgressUI>
        <ProgressHeader>
          <ProgressTitle>학습데이터 생성 중</ProgressTitle>
          <ProgressStatus>{status}%</ProgressStatus>
        </ProgressHeader>
        <ProgressBar status={status} />
      </ProgressUI>
      {status === 100 && <VerticalButton label="다음으로" color="main" bg="brand" onClick={startApp} />}
    </Wrapper>
  );
};
