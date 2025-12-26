import styled from "styled-components";

const Example = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.label};
  font-size: 1rem;
  font-weight: 500;
`;

const Value = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.sub};
  font-size: 2rem;
  font-weight: 500;
`;

export const Definition = () => {};
