import styled from "styled-components";

const Wrapper = styled.button`
  height: 3rem;

  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  gap: 0.5rem;

  background-color: ${({ $bg, theme }) => theme[$bg]};

  border: 0px;
  border-radius: 0.5rem;
  padding: 0.75rem;

  cursor: pointer;
`;

const Label = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  color: ${({ $color, theme }) => theme[$color]};

  & > svg {
    color: ${({ $color, theme }) => theme[$color]};
  }
`;

const Button = ({ label, color, bg, onClick, className }) => {
  return (
    <Wrapper className={className} onClick={onClick} $bg={bg}>
      <Label $color={color}>{label}</Label>
    </Wrapper>
  );
};

// flex layout - column
const ColumnButton = styled(Button)`
  flex: 0 0 auto;
`;

export { Button, ColumnButton };
