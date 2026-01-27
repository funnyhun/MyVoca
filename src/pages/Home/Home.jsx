import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

import { UserDataSection } from "./UserDataSection";
import { PlayButton } from "./PlayButton";
import { Calendar } from "./Calendar";

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
      <UserDataSection userData={userData} />
      <PlayButton />
      <Calendar mode={"compact"} now={now} selectedDay={selectedDay} userData={userData} wordMap={wordMap} />
    </Wrapper>
  );
};
