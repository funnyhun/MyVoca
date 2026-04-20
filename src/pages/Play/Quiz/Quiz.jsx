import styled from "styled-components";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { updateWordStatus } from "../../../utils/voca";
import { Button } from "../../../components/Button";

import { useStep } from "../../../hooks/useMyParam";

import { PlayProgressBar } from "../PlayProgressBar";
import { QuizSelection } from "./QuizSelection";
import { QuizPannel } from "./QuizPannel";

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
`;

const Content = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;

  font-size: 1rem;
  color: ${({ theme }) => theme.font};
  font-weight: 600;

  background-color: ${({ theme }) => theme.main};
`;

export const Quiz = () => {
  const { quizs } = useOutletContext();
  const { step } = useStep();
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuiz = quizs[step];

  if (quizs.length > 0 && step >= quizs.length) {
    return (
      <Wrapper>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <h2 style={{ color: 'white' }}>🎉 모든 퀴즈를 완료했습니다!</h2>
          <Button label="홈으로 돌아가기" onClick={() => window.location.href = '/'} />
        </div>
      </Wrapper>
    );
  }

  if (!currentQuiz) return <div>퀴즈 데이터가 없습니다.</div>;

  const { definitions, word } = currentQuiz;
  
  if (!definitions || definitions.length === 0) {
    return <div>단어 정의 데이터가 없습니다.</div>;
  }

  const def = definitions[0];
  
  // 퀴즈 문항 설정: quiz_en의 첫 번째 문장 사용, 없으면 정의값 활용
  const question = def.quiz_en && def.quiz_en.length > 0 
    ? def.quiz_en[Math.floor(Math.random() * def.quiz_en.length)] 
    : `[ ] : ${def.value}`;
  
  const answer = word;
  
  // 오답 생성: 전체 퀴즈 목록에서 현재 정답을 제외한 무작위 단어 3개 추출
  const wrongs = quizs
    .filter((q) => q.word !== answer)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((q) => q.word);

  // 만약 오답이 부족하면(단어 수가 적을 경우) 기본값 추가
  while (wrongs.length < 3) {
    wrongs.push("---");
  }

  const handleCorrect = () => {
    setIsCorrect(true);
    updateWordStatus(currentQuiz.id, true);
  };

  return (
    <Wrapper>
      <PlayProgressBar total={quizs.length} done={step} />
      <Content>{question}</Content>
      <QuizSelection onClick={handleCorrect} wrongs={wrongs} answer={answer} />
      {isCorrect && <QuizPannel disable={isCorrect} />}
    </Wrapper>
  );
};

