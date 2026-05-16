import { getStorageItem, setStorageItem, KEYS } from "./storage";

/**
 * 게스트 사용자의 특정 단어 학습 상태를 업데이트합니다.
 * @param {number} wordId - 단어 ID
 * @param {boolean} status - 학습 완료 여부
 * @returns {boolean} 업데이트 성공 여부
 */
export const updateGuestWordStatus = (wordId, status = true) => {
  const wordMaps = getStorageItem(KEYS.WORD_MAP);
  const userData = getStorageItem(KEYS.USER_DATA);
  
  if (!wordMaps || !userData) return false;

  const currentLevel = userData.level || "default";
  const wordMap = wordMaps[currentLevel] || [];

  let learnedIncrement = 0;

  const updatedWordMap = wordMap.map((day) => {
    if (!day || !day.word.includes(wordId)) return day;

    // 단어별 개별 status 맵
    const wordStatus = { ...(day.wordStatus || {}) };
    const wasAlreadyDone = wordStatus[wordId] === true;
    wordStatus[wordId] = status;

    // finishedCount 계산 (중복 방지)
    let { finishedCount = 0 } = day;
    if (status && !wasAlreadyDone) {
      finishedCount += 1;
      learnedIncrement = 1;
    } else if (!status && wasAlreadyDone) {
      finishedCount = Math.max(0, finishedCount - 1);
    }

    const length = day.length || day.word.length || 1;
    return {
      ...day,
      wordStatus,
      finishedCount,
      progress: Math.floor((finishedCount / length) * 100),
      done: finishedCount === length,
    };
  });

  wordMaps[currentLevel] = updatedWordMap;
  setStorageItem(KEYS.WORD_MAP, wordMaps);

  // 전체 학습한 단어 수 업데이트
  if (learnedIncrement > 0) {
    const latestUserData = getStorageItem(KEYS.USER_DATA);
    if (latestUserData) {
      latestUserData.learned = (latestUserData.learned || 0) + learnedIncrement;
      setStorageItem(KEYS.USER_DATA, latestUserData);
    }
  }

  return true;
};
