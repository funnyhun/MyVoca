import { supabase } from "./supabase";
import { loadLocalStorage } from "./utils";

/**
 * 특정 단어의 학습 상태를 업데이트합니다.
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
    const wordMap = JSON.parse(window.localStorage.getItem("wordMap"));
    if (!wordMap) return;

    // 해당 단어가 포함된 Day를 찾아 진행도 업데이트
    let learnedIncrement = 0;
    const updatedWordMap = wordMap.map((day) => {
      if (day.word.includes(wordId)) {
        const finishedInDay = day.finishedCount || 0;
        // 임시 방편: 단순히 증가시키되 중복 방지는 현재 구조상 어려움 (추후 단어별 상태 저장 필요)
        const newFinishedCount = Math.min(finishedInDay + 1, day.length);
        if (newFinishedCount > finishedInDay) learnedIncrement = 1;
        
        return {
          ...day,
          finishedCount: newFinishedCount,
          progress: Math.floor((newFinishedCount / day.length) * 100),
          done: newFinishedCount === day.length
        };
      }
      return day;
    });

    window.localStorage.setItem("wordMap", JSON.stringify(updatedWordMap));

    if (learnedIncrement > 0) {
      const userData = JSON.parse(window.localStorage.getItem("userData"));
      if (userData) {
        userData.learned += learnedIncrement;
        window.localStorage.setItem("userData", JSON.stringify(userData));
      }
    }
  }
};


