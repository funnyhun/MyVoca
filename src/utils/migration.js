import { supabase } from "./supabase";
import { loadLocalStorage } from "./utils";

/**
 * LocalStorage에 저장된 데이터를 Supabase DB로 마이그레이션합니다.
 * OAuth 로그인 직후 호출되는 것을 권장합니다.
 */
export const migrateLocalDataToSupabase = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { success: false, message: "로그인 세션이 없습니다." };

  const userId = session.user.id;
  const nick = loadLocalStorage("nick");
  const wordMap = loadLocalStorage("wordMap");

  try {
    // 1. User 프로필 생성/업데이트
    if (nick) {
      await supabase.from("User").upsert({
        user_id: userId,
        nick: nick,
      });
    }

    // 2. 학습 진행 데이터(Voca 테이블) 이식
    if (wordMap && Array.isArray(wordMap)) {
      const vocaInserts = [];
      wordMap.forEach((day) => {
        day.word.forEach((wordId) => {
          vocaInserts.push({
            user_id: userId,
            word_id: Number(wordId),
            day_number: Number(day.id),
            status: day.done || false,
          });
        });
      });

      console.log("마이그레이션 시도 데이터 수:", vocaInserts.length);
      console.log("전송 데이터 전체:", JSON.stringify(vocaInserts));

      if (vocaInserts.length > 0) {
        const { data, error: vocaError } = await supabase
          .from("Voca")
          .upsert(vocaInserts, { onConflict: "user_id, word_id" })
          .select();
          
        if (vocaError) {
          console.error("Voca Upsert 에러 상세:", vocaError);
          throw vocaError;
        }
        console.log("DB 실제 삽입 결과 (Response):", data);
      }
    }

    console.log("마이그레이션 최종 완료 (userId):", userId);


    
    // 마이그레이션 성공 후 로컬 데이터 정리
    window.localStorage.removeItem("nick");
    window.localStorage.removeItem("wordMap");
    window.localStorage.removeItem("userData");

    return { success: true };

  } catch (error) {
    console.error("마이그레이션 실패:", error.message);
    return { success: false, error: error.message };
  }
};
