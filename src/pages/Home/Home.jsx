import styled from "styled-components";

import { UserDataSection } from "./UserDataSection";
import { PlayButton } from "./PlayButton";
import { Calendar } from "./Calendar";
import { useOutletContext } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 0rem 1rem;
`;

export const Home = () => {
  const { nick, userData, now } = useOutletContext();

  return (
    <Wrapper>
      <UserDataSection userData={userData} />
      <PlayButton />
      <Calendar mode={"compact"} now={now} />
    </Wrapper>
  );
};
