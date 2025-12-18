import styled from "styled-components";

import { BorderBox } from "./StyledBox";

const CustomBorderBox = styled(BorderBox)`
  flex: 1 0 auto;
  justify-content: center;
  background-color: ${({ $bg, theme }) => theme[$bg]};
  cursor: pointer;
  border: 0px;

  margin-top: auto;
`;

const ButtonLabel = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  line-height: 1.5;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  color: ${({ $color, theme }) => theme[$color]};

  & > svg {
    color: ${({ $color, theme }) => theme[$color]};
  }
`;

const Button = ({ label, color, bg, onClick, className }) => {
  return (
    <CustomBorderBox className={className} onClick={onClick} $bg={bg}>
      <ButtonLabel $color={color}>{label}</ButtonLabel>
    </CustomBorderBox>
  );
};

// flex layout - column
const ColumnButton = styled(Button)`
  flex: 0 0 auto;
`;

export { Button, ColumnButton };
