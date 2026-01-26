import styled from "styled-components";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { useStep } from "../useStep";

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

  const wrongs = ["careless", "lazy", "fearful"];
  const answer = "persistent";

  const nextQuiz = () => {
    setIsCorrect(true);
  };

  return (
    <Wrapper>
      <PlayProgressBar total={quizs.length} done={step} />
      <Content>Succes often coms to those who are [ ].</Content>
      <QuizSelection onClick={nextQuiz} wrongs={wrongs} answer={answer} />
      {isCorrect && <QuizPannel disable={isCorrect} />}
    </Wrapper>
  );
};
