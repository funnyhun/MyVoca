import { supabase } from "../common/supabase";

/**
 * 사용자의 학습 기록(Voca 테이블)을 조회합니다.
 * @param {string} userId - Supabase 사용자 UUID
 * @param {number} dbLevel - 조회할 난이도 숫자값 (0, 800, 900)
 * @returns {Promise<Array<Object>>} 학습 기록 배열
 */
export const fetchUserVocaData = async (userId, dbLevel) => {
  if (!userId) return [];

  try {
    const { data, error } = await supabase
      .from("Voca")
      .select(`word_id, status, Word!inner(level)`)
      .eq("user_id", userId)
      .eq("Word.level", dbLevel);

    if (error) {
      console.error("[API/User] Fetch Voca Data Error:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("[API/User] Critical Voca Fetch Error:", err);
    return [];
  }
};

/**
 * 특정 단어의 학습 상태를 DB에 업데이트합니다.
 * @param {string} userId - Supabase 사용자 UUID
 * @param {number} wordId - 단어 ID
 * @param {boolean} status - 학습 완료 여부
 * @returns {Promise<boolean>} 업데이트 성공 여부
 */
export const updateUserWordStatus = async (userId, wordId, status = true) => {
  if (!userId || !wordId) return false;

  try {
    const { error } = await supabase
      .from("Voca")
      .update({ status })
      .eq("user_id", userId)
      .eq("word_id", wordId);

    if (error) {
      console.error("[API/User] Update Word Status Error:", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[API/User] Critical Word Update Error:", err);
    return false;
  }
};
