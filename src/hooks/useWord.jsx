import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";

import { useWordData } from "../context/WordDataContext";

export const useWord = (selected) => {
  const { wordMap, userData } = useOutletContext();
  const wordData = useWordData();
  const idx = selected ?? userData.selected;

  const words = useMemo(() => {
    return wordMap[idx].word.map((i) => wordData[i]);
  }, [wordMap, userData, wordData]);

  return { words };
};
