import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

import { ProgressBar } from "../ProgressBar";
import { useStep } from "../useStep";
import { QuizPannel } from "./QuizPannel";
import { useState } from "react";

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
    console.log("correct!");
    setIsCorrect(true);
  };

  return (
    <Wrapper>
      <ProgressBar total={quizs.length} done={step} />
      <Content>Succes often coms to those who are [ ].</Content>
      <QuizPannel onClick={nextQuiz} wrongs={wrongs} answer={answer} />
    </Wrapper>
  );
};
