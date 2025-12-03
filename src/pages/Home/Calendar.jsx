import { useState } from "react";
import styled from "styled-components";

import { BorderBox } from "../../components/StyledBox";

import { calculateCalendarData } from "./util";
import { LeftIcon, RightIcon } from "../../assets/iconList";

const Week = styled.div`
  display: flex;
  gap: 0.1rem;
`;

const DayCircle = styled.div`
  width: 2.5rem;
  height: 2.5rem;

  visibility: ${({ $learned }) => ($learned !== null ? "visible" : "hidden")};

  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ $sunday, theme }) => $sunday && theme.danger};

  background-color: ${({ $learned, theme }) => $learned && theme.week};

  padding: 0.5rem;
  border-radius: 2.5rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  display: none;
`;

const Label = styled.p`
  font-weight: 600;

  & > span {
    color: ${({ theme }) => theme.brand};
  }
`;

const Pannel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TargetDate = styled.p`
  font-weight: 600;
  padding-bottom: 0.1rem;
`;

export const Calendar = (mode, learnRecord) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const data = calculateCalendarData(year, month, [1, 2, 3]);

  const prevMonth = () => {
    if (month === 0) {
      setYear((prev) => prev - 1);
      setMonth(11);
    } else setMonth((prev) => prev - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear((prev) => prev + 1);
      setMonth(0);
    } else setMonth((prev) => prev + 1);
  };

  const startDay = new Date(year, month, 1).getDay() - 1;

  return (
    <BorderBox>
      <Header>
        <Title>학습기록</Title>
        <Label>
          연속 학습 <span>12일째</span>
        </Label>
        <Pannel>
          <LeftIcon onClick={prevMonth} />
          <TargetDate>{`${year}년 ${month + 1}월`}</TargetDate>
          <RightIcon onClick={nextMonth} />
        </Pannel>
      </Header>
      {data.map((week, i) => {
        const lastDay = i * 7;
        return (
          <Week key={i}>
            {week.map((learned, j) => {
              const today = i * 7 + j - startDay;
              return (
                <DayCircle key={j} $learned={learned} $sunday={j === 0}>
                  {today}
                </DayCircle>
              );
            })}
          </Week>
        );
      })}
    </BorderBox>
  );
};
