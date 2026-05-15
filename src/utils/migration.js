import { supabase } from "./supabase";
import { loadLocalStorage } from "./utils";

/**
 * 로컬스토리지 데이터를 Supabase로 마이그레이션합니다.
 * [Used In] src/router/loadUserData.js
 * @returns {Promise<Object>} 성공 여부 객체
 */
export const migrateLocalDataToSupabase = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { success: false, message: "로그인 세션이 없습니다." };

  const userId = session.user.id;
  const nick = loadLocalStorage("nick");
  const wordMaps = loadLocalStorage("wordMaps");

  try {
    // 1. User 프로필 생성/업데이트
    if (nick) {
      await supabase.from("User").upsert({
        user_id: userId,
        nick: nick,
      });
    }

    // 2. 학습 진행 데이터(Voca 테이블) 이식
    if (wordMaps && typeof wordMaps === "object") {
      const vocaInserts = [];
      
      Object.keys(wordMaps).forEach((level) => {
        const levelDays = wordMaps[level];
        if (Array.isArray(levelDays)) {
          levelDays.forEach((day) => {
            if (day && Array.isArray(day.word)) {
              day.word.forEach((wordId) => {
                vocaInserts.push({
                  user_id: userId,
                  word_id: Number(wordId),
                  day_number: Number(day.id),
                  status: day.done || false,
                });
              });
            }
          });
        }
      });

      console.log("마이그레이션 시도 데이터 수:", vocaInserts.length);

      if (vocaInserts.length > 0) {
        // Chunk inserts to avoid Supabase limits on large payloads
        const CHUNK_SIZE = 1000;
        for (let i = 0; i < vocaInserts.length; i += CHUNK_SIZE) {
          const chunk = vocaInserts.slice(i, i + CHUNK_SIZE);
          const { error: vocaError } = await supabase
            .from("Voca")
            .upsert(chunk, { onConflict: "user_id, word_id" });
            
          if (vocaError) {
            console.error("Voca Upsert 에러 상세:", vocaError);
            throw vocaError;
          }
        }
      }
    }

    console.log("마이그레이션 최종 완료 (userId):", userId);
    
    // 마이그레이션 성공 후 로컬 데이터 정리
    window.localStorage.removeItem("nick");
    window.localStorage.removeItem("wordMaps");
    window.localStorage.removeItem("userData");

    return { success: true };

  } catch (error) {
    console.error("마이그레이션 실패:", error.message);
    return { success: false, error: error.message };
  }
};
