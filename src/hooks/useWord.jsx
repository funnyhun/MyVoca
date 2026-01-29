import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";

import { useWordData } from "../context/WordDataContext";

export const useWord = (selected) => {
  const { wordMap, userData } = useOutletContext();
  const wordData = useWordData();

  // param의 현재 학습 데이터가 아닌 데이터 조회 시 인자로 주입
  const idx = selected ?? userData.selected;

  const words = useMemo(() => {
    return wordMap[idx].word.map((i) => wordData[i]);
  }, [wordMap, userData, wordData]);

  return { words };
};
