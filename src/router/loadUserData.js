import { redirect } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { loadLocalStorage } from "../utils/utils";
import { migrateLocalDataToSupabase } from "../utils/migration";

export const loadUserData = async () => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  // 공통: 알림 데이터 로드 (깜빡임 방지를 위해 로더로 이동)
  let dbNotis = [];
  try {
    const { data } = await supabase
      .from("Notification")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) dbNotis = data;
  } catch (e) {
    console.warn("알림 로드 실패:", e);
  }

  const notifications = [...dbNotis];
  if (!session) {
    notifications.unshift({
      id: "sync_req",
      title: "데이터 동기화 권장",
      content: "로그인하여 단어장 데이터를 안전하게 보호하고 기기 간 동기화를 시작하세요.",
      type: "sync",
    });
  } else {
    notifications.unshift({
      id: "sync_ok",
      title: "동기화 완료",
      content: "현재 카카오 계정으로 실시간 데이터 동기화가 활성화되어 있습니다.",
      type: "status",
    });
  }

  // 1. OAuth 로그인 유저: Supabase DB 우선 로드
  if (session && !sessionError) {
    // DB 조회 전 마이그레이션 필요 여부 확인 및 수행
    const hasLocalData = window.localStorage.getItem("wordMap");
    if (hasLocalData) {
      await migrateLocalDataToSupabase();
      // URL의 해시(#access_token 등)가 남아있다면 깔끔하게 제거
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }

    try {
      const { data: userProfile, error: profileError } = await supabase
        .from("User")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (userProfile && !profileError) {
        const { data: vocaData, error: vocaError } = await supabase
          .from("Voca")
          .select("*")
          .eq("user_id", session.user.id);

        if (vocaData && vocaData.length > 0 && !vocaError) {
          // Day 단위로 그룹화
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

          const maxDay = Math.max(...Object.keys(dayGroups).map(Number), 0);
          const processedWordMap = Array.from({ length: maxDay + 1 }, (_, i) => {
            const day = dayGroups[i];
            if (!day) return null;
            return {
              ...day,
              progress: Math.floor((day.finishedCount / day.length) * 100),
            };
          });

          const wordStatusMap = vocaData.reduce((acc, curr) => {
            acc[curr.word_id] = curr.status;
            return acc;
          }, {});

          return {
            nick: loadLocalStorage("nick") || userProfile.nick,
            wordMap: processedWordMap,
            wordStatusMap,
            notifications,
            userData: {
              startedTime: new Date(userProfile.created_at).getTime(),
              continued: 0,
              today: 0,
              learned: vocaData.filter((v) => v.status).length,
              selected: 0,
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

  const processedWordMap = wordMap.map((day) => {
    return {
      ...day,
      progress: day.progress ?? (day.done ? 100 : 0),
    };
  });

  // Guest 유저의 wordStatusMap: wordMap의 각 Day 완료 여부를 단어별로 역산
  const guestWordStatusMap = {};
  wordMap.forEach((day) => {
    const dayDone = day.done || false;
    (day.word || []).forEach((wordId) => {
      guestWordStatusMap[wordId] = dayDone;
    });
  });

  return {
    nick,
    wordMap: processedWordMap,
    wordStatusMap: guestWordStatusMap,
    userData,
    notifications,
  };
};
