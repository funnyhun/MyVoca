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
  white-space: pre-line;
`;

export const WordNoResult = () => (
  <Wrapper>
    <Emoji>🔍</Emoji>
    <Message>{"검색 결과가 없습니다.\n다른 검색어나 필터를 시도해보세요."}</Message>
  </Wrapper>
);
