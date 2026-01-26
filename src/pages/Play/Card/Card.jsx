import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";

import { useStep } from "../useStep";
import { useCard } from "./useCard";

import { BorderBox } from "../../../components/StyledBox";

import { PlayProgressBar } from "../PlayProgressBar";
import { Definition } from "./Definition";
import { Complete } from "./Complete";
import { CardPannel } from "./CardPannel";

import { SpeakIcon } from "../../../assets/iconList";

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
  const { mode, total, done, wordSet, events } = useCard();

  const { changeMode, prevCard, nextCard, replayCard } = events;
  const { word, definitions } = wordSet;

  const CONTENT = {
    word: <Title $length={word.length}>{word}</Title>,
    def: <Definition definitions={definitions} />,
  };

  return mode !== "complete" ? (
    <>
      <PlayProgressBar total={total} done={done} />
      <AudioButton />
      <CustomBorderBox>{CONTENT[mode]}</CustomBorderBox>
      <CardPannel
        changeEvent={changeMode}
        prevEvent={prevCard}
        nextEvent={nextCard}
      />
    </>
  ) : (
    <Complete replayCard={replayCard} />
  );
};
