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

export const shuffleArray = (array) => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

const initWordMap = async (length, bundleSize) => {
  const { data: { session } } = await supabase.auth.getSession();

  // 1. Supabase에서 실제 단어 ID 목록 가져오기 (Anon-key로 가능)
  const { data: words, error } = await supabase.from("Word").select("word_id");
  
  if (error || !words) {
    console.error("단어 ID 목록 로드 실패:", error?.message);
    return;
  }

  // 실제 ID들로 셔플링 수행
  const wordIds = words.map(w => w.word_id);
  const shuffledIds = shuffleArray(wordIds);
  const wordMap = [];

  let idx = 0;
  let dayNum = 0;
  while (idx < shuffledIds.length) {
    const chunk = shuffledIds.slice(idx, idx + bundleSize);
    wordMap.push({
      id: dayNum++,
      word: chunk,
      length: chunk.length,
      done: false,
    });
    idx += bundleSize;
  }

  // 2. LocalStorage에 저장 (기본)
  window.localStorage.setItem("wordMap", JSON.stringify(wordMap));

  // 3. 로그인된 상태라면 Supabase Voca 테이블에도 동기화
  if (session) {
    const vocaInserts = [];
    wordMap.forEach((day) => {
      day.word.forEach((id) => {
        vocaInserts.push({
          user_id: session.user.id,
          word_id: id,
          day_number: day.id,
          status: false,
        });
      });
    });
    await supabase.from("Voca").upsert(vocaInserts);
  }
};


const initUserData = async () => {
  const now = new Date();
  const UserData = {
    startedTime: now.setHours(0, 0, 0, 0),
    continued: 0,
    today: 0,
    learned: 0,
    selected: 0,
  };
  window.localStorage.setItem("userData", JSON.stringify(UserData));
};

export const initAppData = async (length, bundleSize, setStatus) => {
  // 실제 데이터 초기화 작업 진행
  await Promise.all([initWordMap(length, bundleSize), initUserData(), dummyProgress(2000, setStatus)]);
  setStatus(100);
  return true;
};


