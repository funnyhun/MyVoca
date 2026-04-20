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
    const updatedWordMap = wordMap.map((day) => {
      if (day.word.includes(wordId)) {
        // 단어별 개별 status 관리가 현재 로컬 구조에 없으므로
        // 간단하게 해당 단어가 있는 Day의 progress를 업데이트하거나 
        // 추후 개별 단어 status 저장을 위한 객체 구조로 변경 필요.
        // 현재는 UI 일관성을 위해 progress만 소폭 상승시키는 등의 처리 가능.
        const finishedInDay = day.finishedCount || 0;
        const newFinishedCount = Math.min(finishedInDay + 1, day.length);
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
  }
};


