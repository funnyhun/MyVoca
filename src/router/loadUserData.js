import { redirect } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { loadLocalStorage } from "../utils/utils";
import { migrateLocalDataToSupabase } from "../utils/migration";

/**
 * 앱 진입 시 사용자 데이터를 로드합니다. (세션 체크, 프로필, 학습 진행도, 마이그레이션 포함)
 * 상세 로직은 src/router/AGENT.md를 참조하십시오.
 * [Used In] src/router/router.jsx
 * @returns {Promise<Object|Response>} 사용자 데이터 객체 또는 리다이렉션
 */
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
      content: "로그인하여 단어장 데이터를 안전하게 보호하고 기기 동기화를 시작하세요.",
      type: "sync",
    });
  } else {
    notifications.unshift({
      id: "sync_ok",
      title: "동기화 완료",
      content: "현재 계정으로 실시간 데이터 동기화가 활성화되어 있습니다.",
      type: "status",
    });
  }

  // 1. OAuth 로그인 유저: Supabase DB 우선 로드
  if (session && !sessionError) {
    // 마이그레이션 전에 level을 미리 확보 (마이그레이션 시 로컬스토리지 삭제됨)
    const localUserDataBeforeMigrate = loadLocalStorage("userData");
    const currentLevel = localUserDataBeforeMigrate?.level || "default";

    // level 문자열 → DB의 숫자 컬럼 매핑
    const levelToNumber = { "default": 0, "800": 800, "900": 900 };
    const dbLevel = levelToNumber[currentLevel] ?? 0;

    const hasLocalData = window.localStorage.getItem("wordMaps");
    if (hasLocalData) {
      await migrateLocalDataToSupabase();
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
        const localUserData = loadLocalStorage("userData");

        // Voca 테이블에서 현재 레벨에 해당하는 단어들의 학습 상태만 가져옴
        const { data: vocaData, error: vocaError } = await supabase
          .from("Voca")
          .select(`
            *,
            Word!inner(level, day)
          `)
          .eq("user_id", session.user.id)
          .eq("Word.level", dbLevel);

        if (vocaData && vocaData.length > 0 && !vocaError) {
          // Day 단위로 그룹화 (Word 테이블의 day 컬럼 사용, 0-based index)
          const dayGroups = vocaData.reduce((acc, curr) => {
            const dayId = (curr.Word?.day ?? curr.day_number) - 1; // 1-based → 0-based
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
          // null을 유지해야 인덱스가 흐트러지지 않음 (useWord에서 wordMap[idx]로 접근)
          const processedWordMap = Array.from({ length: maxDay + 1 }, (_, i) => {
            const day = dayGroups[i];
            if (!day) return null;
            return {
              ...day,
              progress: Math.floor((day.finishedCount / day.length) * 100),
            };
          });

          // 단어별 개별 완료 상태 맵 구성
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
              selected: localUserData?.selected || 0,
              level: currentLevel,
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
  const wordMaps = loadLocalStorage("wordMaps");
  const userData = loadLocalStorage("userData");

  if (!nick) return redirect("/onboard/nickname");
  if (!wordMaps || !userData) return redirect("/onboard/generate-data");

  const currentLevel = userData.level || "default";
  const wordMap = wordMaps[currentLevel] || [];

  const processedWordMap = wordMap.map((day) => {
    if (!day) return null;
    const finishedCount = day.finishedCount || 0;
    const length = day.length || 1;
    return {
      ...day,
      // finishedCount가 있으면 정밀 계산, 없으면 done 여부로 fallback
      progress: finishedCount > 0
        ? Math.floor((finishedCount / length) * 100)
        : (day.progress ?? (day.done ? 100 : 0)),
    };
  });

  // wordStatus: 단어별 개별 완료 상태 (서버의 wordStatusMap과 동일한 형태)
  const guestWordStatusMap = {};
  wordMap.forEach((day) => {
    (day.word || []).forEach((wordId) => {
      // day.wordStatus에 개별 상태가 있으면 그것을, 없으면 day.done으로 fallback
      const status = day.wordStatus
        ? (day.wordStatus[wordId] ?? false)
        : (day.done || false);
      guestWordStatusMap[wordId] = status;
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
