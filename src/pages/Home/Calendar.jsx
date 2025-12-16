import { useState } from "react";
import styled from "styled-components";

import { BorderBox } from "../../components/StyledBox";

import { calculateCalendarData } from "./util";
import { LeftIcon, RightIcon } from "../../assets/iconList";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

const TargetDate = styled.p`
  font-weight: 600;
  padding-bottom: 0.1rem;
`;

const Week = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.1rem;
`;

const DayContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;

  text-align: center;
  color: ${({ $sunday, theme }) => ($sunday ? theme.danger : theme.sub)};

  padding: 0.5rem;
`;

const DayCircle = styled.div`
  width: 2.5rem;
  height: 2.5rem;

  visibility: ${({ $learned }) => ($learned !== null ? "visible" : "hidden")};

  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ $today, $sunday, theme }) => ($today ? theme.main : $sunday && theme.danger)};

  background-color: ${({ $today, $learned, theme }) => ($today ? theme.brand : $learned && theme.week)};

  padding: 0.5rem;
  border-radius: 2.5rem;
`;

export const Calendar = ({ mode, now }) => {
  const DateObj = new Date(now);

  const currentYear = DateObj.getFullYear();
  const currentMonth = DateObj.getMonth();
  const currentDay = DateObj.getDate();

  const [year, setYear] = useState(DateObj.getFullYear());
  const [month, setMonth] = useState(DateObj.getMonth());

  const data = calculateCalendarData(year, month, [1, 2, 3]);

  const startDay = new Date(year, month, 1).getDay() - 1;

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
      <Week>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <DayContainer key={day} $sunday={day === "일"}>
            {day}
          </DayContainer>
        ))}
      </Week>
      {data.map((week, i) => {
        return (
          <Week key={i}>
            {week.map((learned, j) => {
              const day = i * 7 + j - startDay;
              const $today = currentYear === year && currentMonth === month && currentDay === day;
              return (
                <DayCircle key={`${i}_${j}`} $learned={learned} $sunday={j === 0} $today={$today}>
                  {day}
                </DayCircle>
              );
            })}
          </Week>
        );
      })}
    </BorderBox>
  );
};
