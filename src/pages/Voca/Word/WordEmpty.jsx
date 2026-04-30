import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.label};
  text-align: center;
`;

const Emoji = styled.span`
  font-size: 2.5rem;
`;

const Message = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
`;

export const WordEmpty = () => (
  <Wrapper>
    <Emoji>📭</Emoji>
    <Message>단어가 없습니다.</Message>
  </Wrapper>
);
