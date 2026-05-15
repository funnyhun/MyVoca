import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";

import { useWordData } from "../context/WordDataContext";

/**
 * 특정 Day의 단어 리스트와 개별 학습 상태(done)를 결합하여 반환하는 핵심 커스텀 훅입니다.
 * [Used In] src/pages/Play/Play.jsx, src/pages/Voca/Word/WordList.jsx
 * @param {number} [selected] 조회할 Day 인덱스 (생략 시 userData.selected 사용)
 * @returns {Object} { words: Array }
 */
export const useWord = (selected) => {
  const { wordMap, userData, wordStatusMap = {} } = useOutletContext();
  const wordData = useWordData();

  // param의 현재 학습 데이터가 아닌 데이터 조회 시 인자로 주입
  const idx = typeof selected === "number" ? selected : userData.selected;

  const words = useMemo(() => {
    if (!wordMap || !wordMap[idx]) {
      console.warn(`Day ${idx}에 해당하는 wordMap이 없습니다.`);
      return [];
    }

    return wordMap[idx].word.map((i) => {
      // 숫자, 문자열, 혹은 공백이 섞인 경우를 모두 대비한 룩업
      const data = wordData[i] || wordData[String(i)] || wordData[Number(i)];
      
      if (!data) {
        console.error(`단어 데이터 찾기 실패: ID ${i} (타입: ${typeof i})`, { 
          wordDataKeys: Object.keys(wordData).slice(0, 5),
          isTypeMatch: Object.keys(wordData).includes(String(i))
        });
        return null;
      }
      
      // 유저의 학습 상태(done) 반영
      return {
        ...data,
        done: wordStatusMap[i] || wordStatusMap[String(i)] || wordStatusMap[Number(i)] || false
      };
    }).filter(Boolean);

  }, [wordMap, idx, wordData, wordStatusMap]);


  return { words };
};
