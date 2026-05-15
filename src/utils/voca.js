import { supabase } from "./supabase";
import { loadLocalStorage } from "./utils";

/**
 * 특정 단어의 학습 상태를 업데이트합니다. (로그인 유저: Supabase, Guest: LocalStorage)
 * [Used In] src/pages/Voca/Word/WordItem.jsx, src/pages/Play/Card/useCard.jsx, src/pages/Play/Quiz/Quiz.jsx
 * @param {number} wordId 단어 ID
 * @param {boolean} status 학습 완료 여부
 */
export const updateWordStatus = async (wordId, status = true) => {
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    // 1. OAuth 로그인 유저: Supabase DB 업데이트
    const { error } = await supabase
      .from("Voca")
      .update({ status })
      .eq("user_id", session.user.id)
      .eq("word_id", wordId);

    if (error) console.error("DB 상태 업데이트 실패:", error.message);
  } else {
    // 2. Guest 유저: LocalStorage 업데이트
    const wordMaps = JSON.parse(window.localStorage.getItem("wordMaps"));
    const userData = JSON.parse(window.localStorage.getItem("userData"));
    if (!wordMaps || !userData) return;

    const currentLevel = userData.level || "default";
    const wordMap = wordMaps[currentLevel] || [];

    let learnedIncrement = 0;

    const updatedWordMap = wordMap.map((day) => {
      if (!day.word.includes(wordId)) return day;

      // 단어별 개별 status 맵 (서버의 wordStatusMap과 동일한 구조)
      const wordStatus = { ...(day.wordStatus || {}) };
      const wasAlreadyDone = wordStatus[wordId] === true;
      wordStatus[wordId] = status;

      // finishedCount: 중복 집계 방지 (이미 done인 단어를 다시 true로 해도 증가 안 함)
      let { finishedCount = 0 } = day;
      if (status && !wasAlreadyDone) {
        finishedCount += 1;
        learnedIncrement = 1;
      } else if (!status && wasAlreadyDone) {
        finishedCount = Math.max(0, finishedCount - 1);
      }

      const newDone = finishedCount === day.length;
      return {
        ...day,
        wordStatus,
        finishedCount,
        progress: Math.floor((finishedCount / day.length) * 100),
        done: newDone,
      };
    });

    wordMaps[currentLevel] = updatedWordMap;
    window.localStorage.setItem("wordMaps", JSON.stringify(wordMaps));

    if (learnedIncrement > 0) {
      const latestUserData = JSON.parse(window.localStorage.getItem("userData"));
      if (latestUserData) {
        latestUserData.learned = (latestUserData.learned || 0) + learnedIncrement;
        window.localStorage.setItem("userData", JSON.stringify(latestUserData));
      }
    }
  }
};
