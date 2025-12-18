import styled from "styled-components";
import { useState, useEffect } from "react";

import { DayIcon, DoneIcon } from "../../assets/iconList";

import { ProgressBar } from "./ProgressBar";
import { Card } from "./Card/Card";
import { PlayPannel } from "./PlayPannel";

import { CardPannel } from "./Card/CardPannel";
import { useOutletContext } from "react-router-dom";
import { useWordData } from "../../context/WordDataContext";

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0rem 1rem;
`;

export const Play = () => {
  const { wordMap, selectedDay } = useOutletContext();
  const wordData = useWordData();

  const [words, setWords] = useState([]);
  const [point, setPoint] = useState(0);
  const [status, setStatus] = useState("front");

  useEffect(() => {
    console.log(wordMap, selectedDay);
    setWords(wordMap[selectedDay].word.map((idx) => wordData[idx]));
  }, [wordMap, selectedDay]);

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

  if (words.length === 0)
    return (
      <Wrapper>
        <div>불러올 단어가 없습니다.</div>
      </Wrapper>
    );

  return (
    <Wrapper>
      <ProgressBar total={words.length} done={point} />
      <Card set={words[point]} status={status} />
      <CardPannel changeEvent={changeStatus} />
      <PlayPannel prevEvent={prevWord} nextEvent={nextWord} />
    </Wrapper>
  );
};
