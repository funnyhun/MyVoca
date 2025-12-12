import styled from "styled-components";
import { useState, useEffect } from "react";

import { DayIcon, DoneIcon } from "../../assets/iconList";

import { ProgressBar } from "./ProgressBar";
import { Card } from "./Card/Card";
import { PlayPannel } from "./PlayPannel";

import { CardPannel } from "./Card/CardPannel";

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0rem 1rem;
`;

export const Play = () => {
  const [words, setWords] = useState([]);
  const [point, setPoint] = useState(0);
  const [status, setStatus] = useState("front");

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch("./resources/word.json");

        if (!res.ok) {
          throw new Error("Play : 단어 불러오기 실패");
        }

        const words = await res.json();

        setWords(words);
      } catch (err) {
        console.error("데이터 로딩 중 오류 발생:", err);
      }
    };

    fetchWords();
  }, []);

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

  console.log(words, words.length);

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
