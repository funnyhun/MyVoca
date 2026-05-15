import { createContext, useContext, use, useMemo } from "react";
import { fetchWordData } from "../utils/api.js";

// wordData fetching
const wordDataPromise = fetchWordData();

const WordDataContext = createContext(undefined);

/**
 * 전체 단어 마스터 데이터를 공급하는 프로바이더입니다.
 * [Used In] src/main.jsx (Root)
 */
export const WordDataProvider = ({ children }) => {
  const memoizedPromise = useMemo(() => wordDataPromise, []);

  return (
    <WordDataContext.Provider value={memoizedPromise}>
      {children}
    </WordDataContext.Provider>
  );
};

export const useWordData = () => {
  const promise = useContext(WordDataContext);

  if (promise === undefined) {
    throw new Error("useWordData는 WordDataProvider 내에서 사용해야 합니다.");
  }

  const wordData = use(promise);

  return wordData;
};
