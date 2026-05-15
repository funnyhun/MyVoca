/**
 * 연도와 월에 해당하는 캘린더 데이터를 생성하고 학습 완료 상태를 매핑합니다.
 * [Used In] src/pages/Home/Calendar.jsx
 * @param {number} year 연도
 * @param {number} month 월 (0-11)
 * @param {number} startedTime 학습 시작 시점 (ms)
 * @param {Array} wordMap 학습 데이터 배열
 * @returns {Array} 캘린더 데이터 행렬
 */
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
