import { useState, useEffect } from "react";

const MIN_LOAD_APP = 1000;
const minimum_load = (ms) => new Promise((res) => setTimeout(res, ms));

const loadWords = async () => {
  const res = await fetch("./resources/word.json");

  if (!res.ok) {
    throw new Error("단어 불러오기 실패");
  }

  const words = await res.json();

  return words;
};

export const useInitApp = () => {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [words] = await Promise.all([loadWords(), minimum_load(MIN_LOAD_APP)]);
        setWords(words);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { words, isLoading };
};
