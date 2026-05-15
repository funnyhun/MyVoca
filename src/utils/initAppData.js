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

const initWordMap = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  const { data: words, error } = await supabase.from("Word").select("word_id, level, day");
  
  if (error || !words) {
    console.error("단어 목록 로드 실패:", error?.message);
    return;
  }

  const wordMaps = {
    "default": [],
    "800": [],
    "900": []
  };

  words.forEach(w => {
    let levelStr = String(w.level);
    if (levelStr === "0") levelStr = "default";

    // Convert 1-based day to 0-based array index
    const dayIndex = w.day - 1;

    if (!wordMaps[levelStr]) wordMaps[levelStr] = [];

    // Ensure day array element exists
    if (!wordMaps[levelStr][dayIndex]) {
      wordMaps[levelStr][dayIndex] = {
        id: dayIndex,
        word: [],
        length: 0,
        done: false,
        finishedCount: 0,
        progress: 0
      };
    }

    wordMaps[levelStr][dayIndex].word.push(w.word_id);
    wordMaps[levelStr][dayIndex].length++;
  });

  window.localStorage.setItem("wordMaps", JSON.stringify(wordMaps));

  if (session) {
    // If logged in, clear existing Voca and init?
    // Since it's a structural change, we should probably wipe old voca data or let migration handle it.
    // For now, let's just insert empty status if we want, but since they are dynamically loaded from `Word` table,
    // we don't strictly need to insert all words into `Voca` upfront unless required by `loadUserData.js`.
    // Actually, previously it inserted `status: false` for all words.
    // Let's do that for the selected level? No, do it for all words so sync works.
    const vocaInserts = [];
    Object.keys(wordMaps).forEach(level => {
      wordMaps[level].forEach((day) => {
        if (day) {
          day.word.forEach((id) => {
            vocaInserts.push({
              user_id: session.user.id,
              word_id: id,
              day_number: day.id,
              status: false,
            });
          });
        }
      });
    });
    
    // Chunk inserts due to potentially large size (3000+ words)
    const CHUNK_SIZE = 1000;
    for (let i = 0; i < vocaInserts.length; i += CHUNK_SIZE) {
      await supabase.from("Voca").upsert(vocaInserts.slice(i, i + CHUNK_SIZE), { onConflict: 'user_id, word_id' });
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

