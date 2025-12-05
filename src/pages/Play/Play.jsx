import styled from "styled-components";
import { useState } from "react";

import { DayIcon, DoneIcon } from "../../assets/iconList";

import { ProgressBar } from "./ProgressBar";
import { Card } from "./Card/Card";
import { PlayPannel } from "./PlayPannel";

import dummy from "./word.json";
import { CardPannel } from "./Card/CardPannel";

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0rem 1rem;
`;

export const Play = () => {
  const [words, setWords] = useState(dummy);
  const [point, setPoint] = useState(0);
  const [status, setStatus] = useState("front");
  const word = words[point];

  const prevWord = () => {
    if (point === 0) return;
    setPoint((prev) => prev - 1);
    setStatus("front");
  };

  const nextWord = () => {
    if (point === words.length - 1) return;
    setPoint((prev) => prev + 1);
    setStatus("front");
  };

  const changeStatus = () => {
    setStatus((prev) => (prev === "front" ? "back" : "front"));
  };

  return (
    <Wrapper>
      <ProgressBar total={words.length} done={point} />
      <Card word={word} status={status} />
      <CardPannel changeEvent={changeStatus} />
      <PlayPannel prevEvent={prevWord} nextEvent={nextWord} />
    </Wrapper>
  );
};
