import { useState, useEffect } from "react";
import styled from "styled-components";

const Display = styled.span`
  position: absolute;

  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.week_success};
  line-height: 1;
`;

export const NumberDisplay = ({ second }) => {
  const [count, setCount] = useState(second);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <Display>{count}</Display>;
};
