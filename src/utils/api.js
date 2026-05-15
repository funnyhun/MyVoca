import { supabase } from "./supabase";

/**
 * 단어 마스터 데이터를 가져옵니다.
 * [Used In] src/context/WordDataContext.jsx
 * @returns {Object} 단어 ID를 키로 하는 단어 정보 객체
 */
export const fetchWordData = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  console.log("마스터 데이터 조회 시점 세션:", session ? `유저(${session.user.id})` : "비로그인");

  // Word 테이블과 Definition 테이블만 Join하여 가져옴 (마스터 데이터)
  // 이는 Anon-key로 접근 가능해야 하며 개인 정보를 포함하지 않음
  const { data, error } = await supabase
    .from("Word")
    .select(`
      id:word_id,
      word,
      definitions:Definition (
        class,
        value:definition,
        pronounce,
        example_en,
        example_ko,
        quiz_en,
        quiz_ko
      )
    `);

  if (error) {
    console.error("마스터 데이터 패칭 에러 상세:", error);
    return {};
  }


  console.log("마스터 데이터 로드 완료:", data.length, "건");
  if (data.length > 0) {
    console.log("마스터 데이터 샘플:", data[0]);
  }

  const wordMap = {};
  data.forEach(item => {
    const key = item.id || item.word_id;
    if (key) {
      wordMap[key] = {
        ...item,
        done: false
      };
    }
  });

  console.log("생성된 wordMap 키 개수:", Object.keys(wordMap).length);
  return wordMap;
};



/**
 * 단어 메타데이터(전체 개수 등)를 가져옵니다.
 * [Used In] src/router/loadMetaData.js
 */
export const fetchMetaData = async () => {
  // 메타데이터가 필요하다면 추가 (현재는 단어 개수 등)
  const { count } = await supabase.from("Word").select("*", { count: "exact", head: true });
  return { length: count };
};

