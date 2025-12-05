import styled from "styled-components";

import { BorderBox } from "./StyledBox";

const CustomBorderBox = styled(BorderBox)`
  justify-content: center;
  background-color: ${({ $bg, theme }) => theme[$bg]};
  cursor: pointer;
`;

const Label = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  line-height: 0;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  color: ${({ $color, theme }) => theme[$color]};

  & > svg {
    color: ${({ $color, theme }) => theme[$color]};
  }
`;

export const Button = ({ label, color, bg, onClick }) => {
  return (
    <CustomBorderBox onClick={onClick} $bg={bg}>
      <Label $color={color}>{label}</Label>
    </CustomBorderBox>
  );
};
