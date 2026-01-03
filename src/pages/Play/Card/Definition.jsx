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
  font-size: 1.5rem;
  font-weight: 500;
`;

export const Definition = ({ definitions }) => {
  console.log(definitions);
  return (
    <>
      {definitions.map(({ class: class_, value, exp }, i) => (
        <Value key={i}>{`${class_}. ${value}`}</Value>
      ))}
    </>
  );
};
