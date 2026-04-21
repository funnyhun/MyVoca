import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

import { Calendar } from "./Calendar";
import { StatsDashboard } from "./StatsDashboard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem 1rem;
  padding-bottom: 1rem;
`;

export const Home = () => {
  const { nick, userData, now, selectedDay, wordMap } = useOutletContext();

  return (
    <Wrapper>
      <StatsDashboard userData={userData} wordMap={wordMap} />
      <Calendar mode={"compact"} now={now} selectedDay={selectedDay} userData={userData} wordMap={wordMap} />
    </Wrapper>
  );
};
