import { supabase } from "./supabase";
import { getSession } from "../auth/session";
import { setStorageItem, KEYS } from "../guest/storage";

/**
 * 단어 데이터를 로드하여 Day별 맵을 구성하고 로컬스토리지에 저장합니다.
 * 로그인된 경우 Voca 테이블에 기본 데이터를 생성하여 동기화합니다.
 * 
 * @returns {Promise<Object|null>} 생성된 wordMaps 객체 또는 실패 시 null
 */
export const initWordMap = async () => {
  try {
    const session = await getSession();

    // 1. 단어 데이터 로드 (category 포함)
    const { data: words, error } = await supabase.from("Word").select("word_id, level, day, category");
    
    if (error || !words) {
      console.error("[Common/Voca] 단어 목록 로드 실패:", error?.message);
      return null;
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
      categories.sort((a, b) => (a.day - b.day) || a.category.localeCompare(b.category));

      wordMaps[level] = categories.map((c, idx) => ({
        ...c,
        id: idx,
        done: false,
        finishedCount: 0,
        progress: 0
      }));
    });

    setStorageItem(KEYS.WORD_MAP, wordMaps);

    // 4. 로그인 유저인 경우 Voca 테이블 초기 상태 동기화 (Upsert)
    if (session) {
      const vocaInserts = [];
      Object.keys(wordMaps).forEach(level => {
        wordMaps[level].forEach((dayObj) => {
          dayObj.word.forEach((id) => {
            vocaInserts.push({
              user_id: session.user.id,
              word_id: id,
              day_number: dayObj.day,
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

    return wordMaps;
  } catch (err) {
    console.error("[Common/Voca] Critical Initialization Error:", err);
    return null;
  }
};

/**
 * 사용자 기본 데이터를 로컬스토리지에 초기화합니다.
 * @param {string} level 선택된 레벨
 */
export const initUserData = async (level) => {
  const now = new Date();
  const UserData = {
    startedTime: now.setHours(0, 0, 0, 0),
    continued: 0,
    today: 0,
    learned: 0,
    selected: 0,
    level: level,
  };
  setStorageItem(KEYS.USER_DATA, UserData);
  return UserData;
};
