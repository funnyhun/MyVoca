import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { NumberDisplay } from "./NumberDisplay";

const TimerWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);

  shape-rendering: geometricPrecision;
`;

const BackgroundCircle = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.sub};
  stroke-width: 6;
`;

const progress = keyframes`
  from {
    stroke-dashoffset: 282.6;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const ProgressCircle = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.week_success};
  stroke-width: 6;
  stroke-linecap: round;

  stroke-dasharray: 282.6;

  animation: ${progress} ${({ $duration }) => $duration}s linear forwards;
`;

export const CircleTimer = ({ second = 3, callback }) => {
  useEffect(() => {
    let timerId;

    const startTimer = () => {
      timerId = setTimeout(() => {
        callback();
      }, second * 1000);
    };

    startTimer();

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <TimerWrapper>
      <Svg viewBox="0 0 100 100">
        <BackgroundCircle cx="50" cy="50" r="45" />
        <ProgressCircle cx="50" cy="50" r="45" $duration={second} />
      </Svg>
      <NumberDisplay second={second} />
    </TimerWrapper>
  );
};
