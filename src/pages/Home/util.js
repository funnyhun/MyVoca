import { calculateDate } from "../../utils/utils";

export const calculateCalendarData = (year, month, startedTime, wordMap) => {
  const start = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  const week = Math.ceil((start + total) / 7);

  const data = Array.from({ length: week }, () => Array(7).fill(false));

  let counter = 1;

  for (let m = 0; m < week; m++) {
    for (let d = 0; d < 7; d++) {
      if ((m === 0 && d < start) || counter > total) {
        data[m][d] = null;
        continue;
      }

      const targetDate = new Date(year, month, counter);
      const idx = calculateDate(targetDate, startedTime);
      const valid = idx >= 0 && wordMap[idx];

      data[m][d] = {
        value: counter,
        status : valid ? wordMap[idx].done : null,
      }
      counter++;
    }
  }

  return data;
};
