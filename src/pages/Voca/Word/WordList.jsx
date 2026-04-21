import styled from "styled-components";
import { useState, useMemo, useCallback } from "react";

import { useSelected } from "../../../hooks/useMyParam";
import { useWord } from "../../../hooks/useWord";

import { WordItem } from "./WordItem";
import { WordSearch } from "./WordSearch";
import { WordFilter } from "./WordFilter";
import { WordNoResult } from "./WordNoResult";
import { WordEmpty } from "./WordEmpty";

import { FILTER_SET, FILTER_TYPE } from "./filter";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding-top: 1rem;
`;

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  overflow-y: auto;

  & > :last-child {
    margin-bottom: 1rem;
  }
`;

export const WordList = () => {
  const { selected } = useSelected();
  const { words = [] } = useWord(selected);

  const [filterType, setFilterType] = useState(FILTER_TYPE[0]);
  const [keyword, setKeyword] = useState("");

  const clearCondition = () => {
    setFilterType(FILTER_SET[0]);
    setKeyword("");
  };

  const filteredWords = useMemo(() => {
    let result = FILTER_SET[filterType].callback(words);
    if (keyword.trim()) {
      const lowerKeyword = keyword.toLowerCase();
      result = result.filter(
        (word) =>
          word.word.toLowerCase().includes(lowerKeyword) ||
          word.definitions.some((def) =>
            def.value.toLowerCase().includes(lowerKeyword)
          )
      );
    }
    return result;
  }, [words, filterType, keyword]);

  const renderContentUI = useCallback(() => {
    if (words.length === 0) return <WordEmpty />;

    if (filteredWords.length === 0) return <WordNoResult />;

    return filteredWords.map((word) => {
      return <WordItem word={word} key={word.id} />;
    });
  }, [words, filteredWords]);

  return (
    <Wrapper>
      <WordSearch keyword={keyword} setKeyword={setKeyword} />
      <WordFilter currentFilter={filterType} setFilterType={setFilterType} />
      <Content>{renderContentUI()}</Content>
    </Wrapper>
  );
};
