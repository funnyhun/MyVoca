import styled from "styled-components";

import { FILTER_SET, FILTER_TYPE } from "./filter";

const Wrapper = styled.ul`
  height: max-content;
  display: flex;
  flex: 0 0 auto;
  gap: 1rem;

  margin-right: -1rem;

  overflow-x: auto;

  & > :last-child {
    margin-right: 1rem;
  }
`;

const FilterItem = styled.li`
  display: flex;
  flex: 0 0 auto;
  color: ${({ $selected, theme }) => ($selected ? theme.main : theme.label)};

  background-color: ${({ $selected, theme }) => ($selected ? theme.brand : theme.main)};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
`;

function WordFilter({ currentFilter, setFilterType }) {
  return (
    <Wrapper>
      {FILTER_TYPE.map((key) => (
        <FilterItem key={key} onClick={() => setFilterType(key)} $selected={key === currentFilter}>
          {FILTER_SET[key].label}
        </FilterItem>
      ))}
      <FilterItem>임시필터</FilterItem>
      <FilterItem>임시필터</FilterItem>
      <FilterItem>임시필터</FilterItem>
    </Wrapper>
  );
}

export { WordFilter };
