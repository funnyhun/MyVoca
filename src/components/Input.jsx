import { useId } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.label};
`;

const CustomInput = styled.input`
  padding: 0.5rem 1rem;

  border: 0.1rem solid ${({ theme }) => theme.sub};
  border-radius: 0.5rem;

  &:focus {
    outline: 0.1rem solid ${({ theme }) => theme.label};
  }

  &::placeholder {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.sub};
  }
`;

const Notice = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.label};
  padding-left: 0.2rem;
`;

export const Input = ({ label, value, onChange, notice }) => {
  const id = useId();

  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <CustomInput id={id} value={value} onChange={onChange} placeholder="닉네임 입력(2~10글자)" />
      {notice && <Notice>{notice}</Notice>}
    </Wrapper>
  );
};
