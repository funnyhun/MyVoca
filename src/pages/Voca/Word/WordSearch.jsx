import styled from "styled-components";
import { useState } from "react";

import { Input } from "../../../components/Input";

import { SearchIcon } from "../../../assets/iconList";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const WordSearch = () => {
  const [value, setValue] = useState("");

  const changeValue = (e) => setValue(e.target.value);

  return (
    <Wrapper>
      <Input
        icon={SearchIcon}
        label=""
        value={value}
        onChange={changeValue}
        notice={""}
        placeholder={"단어 또는 뜻 검색"}
        $isBorder={false}
        $isOutline={false}
      />
    </Wrapper>
  );
};
