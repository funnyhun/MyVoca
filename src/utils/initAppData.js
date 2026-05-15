import { supabase } from "./supabase";

const dummyProgress = (duration, setStatus) => {
  const steps = 100;
  const interval = duration / steps;
  let currentStep = 0;

  return new Promise((res) => {
    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(99, Math.floor((currentStep / steps) * 99));

      setStatus(progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        res();
      }
    }, interval);
  });
};

/**
 * 단어 데이터를 로드하여 Day별 맵을 구성하고 로컬스토리지에 저장합니다.
 * 로그인된 경우 Voca 테이블에 기본 데이터를 생성합니다.
 */
export const initWordMap = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  // 1. 단어 데이터 로드 (category 포함)
  const { data: words, error } = await supabase.from("Word").select("word_id, level, day, category");
  
  if (error || !words) {
    console.error("단어 목록 로드 실패:", error?.message);
    return;
  }

  const tempMaps = {};

  // 2. Level 및 Category별 그룹화
  words.forEach(w => {
    let levelStr = String(w.level);
    if (levelStr === "0") levelStr = "default";

    if (!tempMaps[levelStr]) tempMaps[levelStr] = {};

    const catName = w.category || "기타";
    if (!tempMaps[levelStr][catName]) {
      tempMaps[levelStr][catName] = {
        category: catName,
        day: w.day || 1,
        word: [],
        length: 0
      };
    }

    tempMaps[levelStr][catName].word.push(w.word_id);
    tempMaps[levelStr][catName].length++;
  });

  // 3. Dense Array로 변환 및 정렬
  const wordMaps = {};
  Object.keys(tempMaps).forEach(level => {
    const categories = Object.values(tempMaps[level]);
    // Day 순서로 정렬하여 일관된 인덱스 부여
    categories.sort((a, b) => (a.day - b.day) || a.category.localeCompare(b.category));

    wordMaps[level] = categories.map((c, idx) => ({
      ...c,
      id: idx, // Frontend용 0-based index
      done: false,
      finishedCount: 0,
      progress: 0
    }));
  });

  window.localStorage.setItem("wordMap", JSON.stringify(wordMaps));

  // 4. 로그인 유저인 경우 Voca 테이블 초기 상태 동기화
  if (session) {
    const vocaInserts = [];
    Object.keys(wordMaps).forEach(level => {
      wordMaps[level].forEach((dayObj) => {
        dayObj.word.forEach((id) => {
          vocaInserts.push({
            user_id: session.user.id,
            word_id: id,
            day_number: dayObj.day, // 원본 DB Day 유지
            status: false,
          });
        });
      });
    });
    
    const CHUNK_SIZE = 1000;
    for (let i = 0; i < vocaInserts.length; i += CHUNK_SIZE) {
      await supabase.from("Voca").upsert(vocaInserts.slice(i, i + CHUNK_SIZE), { 
        onConflict: 'user_id, word_id' 
      });
    }
  }
};

const initUserData = async (level) => {
  const now = new Date();
  const UserData = {
    startedTime: now.setHours(0, 0, 0, 0),
    continued: 0,
    today: 0,
    learned: 0,
    selected: 0,
    level: level, // newly added level setting
  };
  window.localStorage.setItem("userData", JSON.stringify(UserData));
};

/**
 * 앱 초기 데이터를 설정합니다. (단어 맵 생성 및 사용자 데이터 초기화)
 * [Used In] src/pages/Settings/Settings.jsx, src/onboard/StepToData.jsx
 * @param {string} level 선택된 레벨
 * @param {Function} setStatus 진행률 업데이트 함수
 */
export const initAppData = async (level, setStatus) => {
  await Promise.all([initWordMap(), initUserData(level), dummyProgress(2000, setStatus)]);
  setStatus(100);
  return true;
};

