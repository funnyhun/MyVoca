export const loadLocalStorage = (key) => {
  try {
    const res = window.localStorage.getItem(key);
    if (!res) return null;

    // JSON | 일반 문자열
    try {
      const parsed = JSON.parse(res);
      return parsed;
    } catch (e) {
      return res;
    }
  } catch (e) {
    console.error("로컬스토리지의 데이터 불러오기 실패 :", e);
    return null;
  }
};

// 1000 * 60 * 60 * 24
const msToDay = 86400000;

export const calculateDate = (now, startedTime) => {
  const currentTime = new Date(now).setHours(0, 0, 0, 0);
  const diff = startedTime - currentTime;

  return Math.floor(diff / msToDay);
};
