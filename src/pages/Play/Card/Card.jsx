import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

import { CardPannel } from "./CardPannel";
import { ProgressBar } from "../ProgressBar";
import { BorderBox } from "../../../components/StyledBox";

import { SpeakIcon } from "../../../assets/iconList";
import { Definition } from "./Definition";

const AudioButton = styled(SpeakIcon)`
  width: 2.5rem;
  height: 2.5rem;
  align-self: flex-end;
  cursor: pointer;

  margin-bottom: 0.5rem;
`;

const CustomBorderBox = styled(BorderBox)`
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
`;

const Title = styled.h3`
  text-align: center;
  font-size: ${({ $length }) => `clamp(1rem, ${3.5 - $length / 8}rem, 3.5rem)`};
  font-weight: 600;
  letter-spacing: 0.2rem;
`;

const ContentWrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

export const Card = () => {
  const { words } = useOutletContext();

  const [point, setPoint] = useState(0);
  const [status, setStatus] = useState("word");

  const prevWord = () => {
    if (point === 0) return;
    setPoint((prev) => prev - 1);
    setStatus("word");
  };

  const nextWord = () => {
    if (point === words.length - 1) {
      setPoint(0);
      setStatus("complete");
      return;
    }
    setPoint((prev) => prev + 1);
    setStatus("word");
  };

  const changeStatus = () => {
    setStatus((prev) => (prev === "word" ? "def" : "word"));
  };

  const CONTENTS = {
    word: <Title>{words[point].word}</Title>,
    def: <Definition />,
    complete: null,
  };

  console.log(status);

  return (
    <>
      <ProgressBar total={words.length} done={point} />
      <AudioButton />
      <CustomBorderBox>
        <ContentWrapper>{CONTENTS[status]}</ContentWrapper>
      </CustomBorderBox>
      <CardPannel changeEvent={changeStatus} prevEvent={prevWord} nextEvent={nextWord} />
    </>
  );
};
