import { useState } from "react";
import styled from "styled-components";

import { Button } from "../../../components/Button";

import { CheckIcon, CloseIcon } from "../../../assets/iconList";

const OptionButton = styled(Button)`
  justify-content: flex-start;

  & svg {
    visibility: ${({ $isClicked }) => ($isClicked ? "visible" : "hidden")};
    margin-left: auto;
  }
`;

export const Option = ({ label, corrected, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const clickedOption = () => {
    setIsClicked(true);
    if (corrected) onClick();
  };

  const buttonProperty = {
    label: (
      <>
        {label}
        {corrected ? <CheckIcon /> : <CloseIcon />}
      </>
    ),
    color: isClicked ? "main" : "font",
    bg: isClicked ? (corrected ? "success" : "danger") : "main",
  };

  return (
    <OptionButton
      label={buttonProperty.label}
      bg={buttonProperty.bg}
      color={buttonProperty.color}
      onClick={clickedOption}
      $isClicked={isClicked}
    />
  );
};
