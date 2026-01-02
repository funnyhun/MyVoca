import { useState, useMemo } from "react";
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

const TargetDate = styled.p`
  font-weight: 600;
  line-height: 1;
  padding-bottom: 0.2rem;
`;

const Pannel = styled.div`
  display: flex;
  align-items: center;
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
  color: ${({ $isSunday, theme }) => ($isSunday ? theme.danger : theme.sub)};

  padding: 0.5rem;
`;

const DayCircle = styled.div`
  width: 2.5rem;
  height: 2.5rem;

  visibility: ${({ $isLearned }) => ($isLearned !== null ? "visible" : "hidden")};

  text-align: center;
  line-height: 1;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ $isToday, $isSunday, theme }) => ($isToday ? theme.main : $isSunday && theme.danger)};

  background-color: ${({ $isToday, $isLearned, theme }) =>
    $isToday ? theme.brand : $isLearned && theme.week};

  padding-top: 0.8rem;
  border-radius: 2.5rem;
`;

export const Calendar = ({ mode, userData, now, wordMap }) => {
  const DateObj = useMemo(() => new Date(now), [now]);

  const currentYear = DateObj.getFullYear();
  const currentMonth = DateObj.getMonth();
  const currentDay = DateObj.getDate();

  const [year, setYear] = useState(DateObj.getFullYear());
  const [month, setMonth] = useState(DateObj.getMonth());

  const data = useMemo(
    () => calculateCalendarData(year, month, userData.startedTime, wordMap),
    [year, month]
  );

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
          연속 학습 <span>{`${userData.learned}일 째`}</span>
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
            {week.map((day, j) => {
              const isValidYearMonth = year === currentYear && month === currentMonth;
              const isToday = day && day.value === currentDay;

              return (
                <DayCircle
                  key={`${i}${j}`}
                  $isSunday={j === 0}
                  $isToday={isValidYearMonth && isToday}
                  $isDone={day && day.status}
                >
                  {day ? day.value : day}
                </DayCircle>
              );
            })}
          </Week>
        );
      })}
    </BorderBox>
  );
};
