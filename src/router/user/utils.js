import { supabase } from "../../utils/supabase";
import { loadLocalStorage } from "../../utils/utils";
import { migrateLocalDataToSupabase } from "../../utils/migration";
import { initWordMap } from "../../utils/initAppData";

/**
 * 기반 wordMap에 학습 상태를 병합하여 UI용 데이터를 생성합니다.
 */
export const processWordMap = (baseWordMap, wordStatusMap) => {
  if (!Array.isArray(baseWordMap)) return [];

  return baseWordMap.map((day) => {
    if (!day) return null;
    
    let finishedCount = 0;
    const wordList = day.word || [];
    
    wordList.forEach((id) => {
      if (wordStatusMap[id] === true) finishedCount++;
    });

    const length = day.length || wordList.length || 1;

    return {
      ...day,
      finishedCount,
      done: finishedCount === length,
      progress: Math.floor((finishedCount / length) * 100),
    };
  });
};

/**
 * Guest 유저의 로컬 데이터를 기반으로 wordStatusMap을 생성합니다.
 */
export const createGuestStatusMap = (wordMap) => {
  if (!Array.isArray(wordMap)) return {};

  const statusMap = {};
  wordMap.forEach((day) => {
    if (!day) return;
    (day.word || []).forEach((wordId) => {
      const status = day.wordStatus
        ? (day.wordStatus[wordId] ?? false)
        : (day.done || false);
      statusMap[wordId] = status;
    });
  });
  return statusMap;
};

/**
 * 로그인 유저(Member)의 데이터를 로드하고 가공합니다.
 */
export const handleMemberFlow = async (session, wordData, notifications) => {
  const localUserData = loadLocalStorage("userData");
  const currentLevel = localUserData?.level || "default";
  const levelToNumber = { "default": 0, "800": 800, "900": 900 };
  const dbLevel = levelToNumber[currentLevel] ?? 0;

  // 1. 마이그레이션 체크
  const hasLocalData = window.localStorage.getItem("wordMap");
  if (hasLocalData) {
    await migrateLocalDataToSupabase();
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  // 2. 프로필 조회
  const { data: userProfile, error: profileError } = await supabase
    .from("User")
    .select("*")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (!userProfile || profileError) throw new Error("프로필을 찾을 수 없습니다.");

  // 3. 템플릿 로드
  let wordMaps = loadLocalStorage("wordMap");
  if (!wordMaps) {
    await initWordMap();
    wordMaps = loadLocalStorage("wordMap");
  }
  const baseWordMap = wordMaps ? (wordMaps[currentLevel] || []) : [];

  // 4. 학습 상태 조회
  const { data: vocaData, error: vocaError } = await supabase
    .from("Voca")
    .select(`word_id, status, Word!inner(level)`)
    .eq("user_id", session.user.id)
    .eq("Word.level", dbLevel);

  if (vocaError) throw vocaError;

  const wordStatusMap = (vocaData || []).reduce((acc, curr) => {
    acc[curr.word_id] = curr.status;
    return acc;
  }, {});

  // 5. 데이터 병합
  const processedWordMap = processWordMap(baseWordMap, wordStatusMap);

  return {
    nick: loadLocalStorage("nick") || userProfile.nick,
    wordMap: processedWordMap,
    wordStatusMap,
    wordData,
    notifications,
    userData: {
      startedTime: new Date(userProfile.created_at).getTime(),
      continued: 0,
      today: 0,
      learned: vocaData ? vocaData.filter((v) => v.status).length : 0,
      selected: localUserData?.selected || 0,
      level: currentLevel,
    },
  };
};

/**
 * 미인증 유저(Guest)의 데이터를 로드하고 가공합니다.
 */
export const handleGuestFlow = (wordData, notifications) => {
  const nick = loadLocalStorage("nick");
  const wordMaps = loadLocalStorage("wordMap");
  const userData = loadLocalStorage("userData");

  if (!nick) return { redirect: "/onboard/nickname" };
  if (!wordMaps || !userData) return { redirect: "/onboard/generate-data" };

  const currentLevel = userData.level || "default";
  const rawWordMap = wordMaps[currentLevel] || [];
  
  const statusMap = createGuestStatusMap(rawWordMap);
  const processedWordMap = processWordMap(rawWordMap, statusMap);

  return {
    nick,
    wordMap: processedWordMap,
    wordStatusMap: statusMap,
    wordData,
    userData,
    notifications,
  };
};
