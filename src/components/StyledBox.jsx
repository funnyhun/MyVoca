import styled from "styled-components";

export const IconBox = styled.div`
  display: flex;
  flex: 0 0 0;
  cursor: pointer;

  & > svg {
  }
`;

export const BorderBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  gap: 0.5rem;

  padding: 0.75rem;

  text-align: left;
  background-color: ${({ theme }) => theme.main};

  border: 0.1rem solid ${({ theme }) => theme.main};
  border-radius: 0.5rem;
`;

export const BoxGroup = styled.div`
  display: flex;
  gap: 1rem;
`;
