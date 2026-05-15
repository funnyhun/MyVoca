/**
 * 로컬스토리지에서 데이터를 가져와 파싱합니다.
 * [Used In] src/hooks/useTheme.jsx, src/router/loadUserData.js, src/router/loadPlay.js, src/utils/voca.js, src/utils/migration.js
 * @param {string} key 로컬스토리지 키
 * @returns {any} 파싱된 데이터 또는 원본 문자열
 */
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

/**
 * 특정 시점으로부터 경과한 일수를 계산합니다.
 * [Used In] src/pages/Home/util.js, src/pages/Play/util.js
 * @param {Date|string} now 현재 시점
 * @param {Date|string} startedTime 시작 시점
 * @returns {number} 경과 일수
 */
export const calculateDate = (now, startedTime) => {
  const currentTime = new Date(now).setHours(0, 0, 0, 0);
  const diff = currentTime - startedTime;

  return Math.floor(diff / msToDay);
};

/**
 * 학습 통계(연속 학습일, 오늘 학습량)를 업데이트합니다.
 * [Used In] src/pages/Play/Card/Complete.jsx, src/pages/Play/Quiz/Complete.jsx
 */
export const updateLearningStats = () => {
  const userData = loadLocalStorage("userData");
  if (!userData) return;

  const now = new Date();
  const todayMidnight = new Date(now).setHours(0, 0, 0, 0);
  const lastStudiedAt = userData.lastStudiedAt || null;

  let { continued = 0, today = 0 } = userData;

  if (lastStudiedAt) {
    const lastDay = new Date(lastStudiedAt).setHours(0, 0, 0, 0);
    const diffDays = Math.floor((todayMidnight - lastDay) / msToDay);

    if (diffDays === 0) {
      // 오늘 이미 학습한 경우: today만 증가
      today += 1;
    } else if (diffDays === 1) {
      // 어제 학습했고 오늘 최초 완료: 연속 학습 유지 + today 리셋
      continued += 1;
      today = 1;
    } else {
      // 이틀 이상 공백: 연속 학습 초기화
      continued = 1;
      today = 1;
    }
  } else {
    // 최초 학습 완료
    continued = 1;
    today = 1;
  }

  const updated = {
    ...userData,
    today,
    continued,
    lastStudiedAt: now.toISOString(),
  };

  window.localStorage.setItem("userData", JSON.stringify(updated));
};

/**
 * 배열을 무작위로 섞습니다 (Fisher-Yates).
 * [Used In] src/pages/Play/Play.jsx
 * @param {Array} array 원본 배열
 * @returns {Array} 섞인 새 배열
 */
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

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
        status: valid ? wordMap[idx].done : null,
      };
      counter++;
    }
  }

  return data;
};
