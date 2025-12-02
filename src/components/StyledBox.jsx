import styled from "styled-components";

export const CircleIcon = styled.div`
  display: flex;
  flex: 0 0 0;

  & > svg {
    fill: ${({ theme }) => theme.color};
    width: 1rem;
    height: 1rem;
  }
`;

export const BorderBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  gap: 0.1rem;
  background-color: ${({ theme }) => theme.themeColor};
  border: 0.1rem solid ${({ theme }) => theme.themeColor};
  border-radius: 0.5rem;
  padding: 0.5rem;
  text-align: left;
`;

export const Bundle = styled.div`
  display: flex;
  gap: 0.5rem;
`;
