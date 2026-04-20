import { redirect } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { loadLocalStorage } from "../utils/utils";
import { migrateLocalDataToSupabase } from "../utils/migration";

export const loadUserData = async () => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  // 1. OAuth 로그인 유저: Supabase DB 우선 로드
  if (session && !sessionError) {
    console.log("현재 세션 유저 ID:", session.user.id);

    // DB 조회 전 마이그레이션 필요 여부 확인 및 수행
    const hasLocalData = window.localStorage.getItem("wordMap");
    if (hasLocalData) {
      console.log("로컬 데이터 발견, 렌더링 전 마이그레이션을 시작합니다...");
      await migrateLocalDataToSupabase();
      console.log("마이그레이션 완료. DB에서 최신 데이터를 가져옵니다.");
      // URL의 해시(#access_token 등)가 남아있다면 깔끔하게 제거
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }

    try {
      // 디버깅을 위해 조건 없이 전체 데이터를 일단 가져와 봅니다.
      const { data: debugData } = await supabase.from("Voca").select("user_id");
      console.log("Voca 내 현재 유저의 학습 데이터 쌍:", debugData?.map(d => d.user_id));

      const { data: userProfile, error: profileError } = await supabase
        .from("User")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();



      if (userProfile && !profileError) {
        console.log("Voca 데이터 조회 시작 (userId):", session.user.id);
        const { data: vocaData, error: vocaError } = await supabase
          .from("Voca")
          .select("*")
          .eq("user_id", session.user.id);

        if (vocaError) {
          console.error("Voca 데이터 조회 에러 상세:", vocaError);
        }
        console.log("Voca 조회 결과 데이터:", vocaData);

        if (vocaData && vocaData.length > 0 && !vocaError) {

          // 1. Day 단위로 그룹화 (객체 사용으로 sparse array 방지)
          const dayGroups = vocaData.reduce((acc, curr) => {
            const dayId = curr.day_number;
            if (!acc[dayId]) {
              acc[dayId] = { id: dayId, word: [], length: 0, done: true, finishedCount: 0 };
            }
            acc[dayId].word.push(curr.word_id);
            acc[dayId].length++;
            if (curr.status) acc[dayId].finishedCount++;
            else acc[dayId].done = false;
            return acc;
          }, {});

          // 2. Day 번호를 인덱스로 하는 배열 생성 (Sparse Array 대응)
          const maxDay = Math.max(...Object.keys(dayGroups).map(Number), 0);
          const processedWordMap = Array.from({ length: maxDay + 1 }, (_, i) => {
            const day = dayGroups[i];
            if (!day) return null; // 데이터가 없는 Day는 null 처리
            return {
              ...day,
              progress: Math.floor((day.finishedCount / day.length) * 100)
            };
          });


          return {
            nick: loadLocalStorage("nick") || userProfile.nick,
            wordMap: processedWordMap,
            userData: {
              startedTime: new Date(userProfile.created_at).getTime(),
              continued: 0,
              today: 0,
              learned: vocaData.filter(v => v.status).length,
              selected: 0
            },
          };
        }
      }
    } catch (err) {
      console.warn("DB 로드 중 오류 발생, 로컬 데이터로 대체합니다:", err);
    }
  }

  // 2. Guest 유저 또는 세션 정보 부족 시: LocalStorage 로드
  const nick = loadLocalStorage("nick");
  const wordMap = loadLocalStorage("wordMap");
  const userData = loadLocalStorage("userData");

  if (!nick) return redirect("/onboard/nickname");
  if (!wordMap || !userData) return redirect("/onboard/generate-data");

  // 게스트 유저도 동일하게 진행도(progress) 계산 (구버전 데이터 호환성 및 UI 일관성)
  const processedWordMap = wordMap.map(day => {
    // 만약 단어별 status가 없다면 기본적으로 0% 또는 계산 로직 적용
    // 현재 로컬 구조는 Day 단위로 done 여부만 관리하므로 이를 progress로 변환
    return {
      ...day,
      progress: day.progress ?? (day.done ? 100 : 0)
    };
  });

  return {
    nick,
    wordMap: processedWordMap,
    userData,
  };
};





