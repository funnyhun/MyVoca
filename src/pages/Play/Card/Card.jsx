import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

import { CardPannel } from "./CardPannel";
import { ProgressBar } from "../ProgressBar";
import { BorderBox } from "../../../components/StyledBox";

import { SpeakIcon } from "../../../assets/iconList";
import { Definition } from "./Definition";
import { Complete } from "./Complete";

const AudioButton = styled(SpeakIcon)`
  width: 2.5rem;
  height: 2.5rem;
  align-self: flex-end;
  cursor: pointer;

  margin-bottom: 0.5rem;
`;

const CustomBorderBox = styled(BorderBox)`
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  padding: 1rem;
`;

const Title = styled.h3`
  text-align: center;
  font-size: ${({ $length }) => `clamp(1rem, ${3.5 - $length / 8}rem, 3.5rem)`};
  font-weight: 600;
  letter-spacing: 0.2rem;
`;

export const Card = () => {
  const { words, changeMode } = useOutletContext();

  const [point, setPoint] = useState(0);
  const [status, setStatus] = useState("word");

  const prevWord = () => {
    if (point === 0) return;
    setPoint((prev) => prev - 1);
    setStatus("word");
  };

  const nextWord = () => {
    if (point === words.length - 1) {
      setStatus("complete");
      return;
    }
    setPoint((prev) => prev + 1);
    setStatus("word");
  };

  const changeStatus = () => {
    setStatus((prev) => (prev === "word" ? "def" : "word"));
  };

  const replayCard = () => {
    setPoint(0);
    setStatus("word");
  };

  const { word, definitions } = words[point];

  const CONTENT = {
    word: <Title $length={word.length}>{word}</Title>,
    def: <Definition definitions={definitions} />,
  };

  return status !== "complete" ? (
    <>
      <ProgressBar total={words.length} done={point} />
      <AudioButton />
      <CustomBorderBox>{CONTENT[status]}</CustomBorderBox>
      <CardPannel changeEvent={changeStatus} prevEvent={prevWord} nextEvent={nextWord} />
    </>
  ) : (
    <Complete changeMode={changeMode} replayCard={replayCard} />
  );
};
