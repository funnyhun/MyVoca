import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";

import { useWordData } from "../context/WordDataContext";

export const useWord = () => {
  const { wordMap, userData } = useOutletContext();
  const wordData = useWordData();

  const words = useMemo(() => {
    return wordMap[userData.selected].word.map((i) => wordData[i]);
  }, [wordMap, userData, wordData]);

  return { words };
};
