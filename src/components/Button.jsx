import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;

  background-color: ${({ $bg, theme }) => theme[$bg]};

  border: 0px;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-top: auto;

  cursor: pointer;
`;

const Label = styled.span`
  width: 100%;

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

const SmallButton = styled(Button)`
  padding: 0.5rem;

  & > span {
    font-size: 0.8rem;
  }
`;

const VerticalButton = styled(Button)`
  flex: none;
`;

export { Button, SmallButton, VerticalButton };
