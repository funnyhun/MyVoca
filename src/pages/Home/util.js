export const calculateCalendarData = (year, month, record) => {
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

      data[m][d] = record.includes(counter);
      counter++;
    }
  }

  return data;
};
