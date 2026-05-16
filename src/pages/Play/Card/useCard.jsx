import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useStep } from "../../../hooks/useMyParam";
import { updateWordStatus } from "../../../api/voca";

export const useCard = () => {
  const { words } = useOutletContext();
  const { step, changeStep } = useStep();
  const [mode, setMode] = useState("word");

  const changeMode = () => {
    setMode((prev) => (prev === "word" ? "def" : "word"));
  };

  const prevCard = () => {
    if (step === 0) return;
    changeStep(step - 1);
  };

  const nextCard = () => {
    // 현재 단어 학습 완료 처리
    const currentWord = words[step];
    if (currentWord) {
      updateWordStatus(currentWord.id, true);
    }

    if (step === words.length - 1) {
      setMode("complete");
      return;
    }
    changeStep(step + 1);
  };

  const replayCard = () => {
    changeStep(0);
  };


  return {
    mode,
    total: words.length,
    done: step,
    wordSet: words[step],
    events: { changeMode, prevCard, nextCard, replayCard },
  };
};
