import { useState, useMemo, Suspense } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import styled from "styled-components";

import { ProgressBar } from "./ProgressBar";
import { PlayPannel } from "./PlayPannel";

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
  const [mode, setMode] = useState("Card");

  const words = useMemo(
    () => wordMap[selectedDay].word.map((idx) => wordData[idx]),
    [wordMap, selectedDay, mode]
  );

  const changeMode = () => {
    setMode((prev) => (prev === "Card" ? "Quiz" : "Card"));
  };

  if (words.length === 0)
    return (
      <Wrapper>
        <div>불러올 단어가 없습니다.</div>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Suspense fallback={<div>불러올 단어가 없습니다.</div>} />
      <Outlet context={{ words, changeMode }} />
    </Wrapper>
  );
};
