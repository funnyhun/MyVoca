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
