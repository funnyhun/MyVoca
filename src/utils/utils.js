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
 * @param {Date|string} now 현재 시점 (Date 객체 또는 ISO 문자열)
 * @param {Date|string} startedTime 시작 시점 (Date 객체 또는 ISO 문자열)
 * @returns {number} 경과 일수 (정수)
 */
export const calculateDate = (now, startedTime) => {
  const currentTime = new Date(now).setHours(0, 0, 0, 0);
  const diff = currentTime - startedTime;

  return Math.floor(diff / msToDay);
};

/**
 * 카드 또는 퀴즈 완료 시 학습 통계를 업데이트합니다.
 * - today: 오늘 완료한 세션 수 증가
 * - continued: 연속 학습일 계산 및 업데이트 (카드/퀴즈 완료 기준)
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
 * fisher-yates 알고리즘을 사용하여 배열을 무작위로 섞습니다.
 * @param {Array} array 섞을 배열
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
