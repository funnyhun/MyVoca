import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";

import { useStep } from "../useStep";
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
  const navigate = useNavigate();
  const { words } = useOutletContext();

  const step = useStep();
  const [status, setStatus] = useState("word");

  const changeStatus = () => {
    setStatus((prev) => (prev === "word" ? "def" : "word"));
  };

  const changeStep = (step) => {
    const path = `../${step}`;
    navigate(path, { relative: "path" });
  };

  const prevCard = () => {
    if (step === 0) return;
    setStatus("word");
    changeStep(step - 1);
  };

  const nextCard = () => {
    if (step === words.length - 1) {
      setStatus("complete");
      return;
    }
    setStatus("word");
    changeStep(step + 1);
  };

  const replayCard = () => {
    setStatus("word");
    changeStep(0);
  };

  const { word, definitions } = words[step];

  const CONTENT = {
    word: <Title $length={word.length}>{word}</Title>,
    def: <Definition definitions={definitions} />,
  };

  return status !== "complete" ? (
    <>
      <ProgressBar total={words.length} done={step} />
      <AudioButton />
      <CustomBorderBox>{CONTENT[status]}</CustomBorderBox>
      <CardPannel
        changeEvent={changeStatus}
        prevEvent={prevCard}
        nextEvent={nextCard}
      />
    </>
  ) : (
    <Complete replayCard={replayCard} />
  );
};
