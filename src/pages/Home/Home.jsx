import styled from "styled-components";

import { UserDataSection } from "./UserDataSection";
import { PlayButton } from "./PlayButton";
import { Calendar } from "./Calendar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 0rem 1rem;
`;

export const Home = () => {
  return (
    <Wrapper>
      <UserDataSection />
      <PlayButton />
      <Calendar mode={"compact"} />
    </Wrapper>
  );
};
