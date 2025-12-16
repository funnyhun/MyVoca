const fetchData = async (path) => {
  const res = await fetch(path);

  if (!res.ok) {
    throw new Error("데이터 패칭에 실패했습니다.");
  }
  try {
    const data = await res.json();

    return data;
  } catch (error) {
    // JSON 파싱 자체가 실패했을 때 (HTML을 받은 경우 등)
    console.error(`경로: ${path} 에서 JSON 파싱 중 오류 발생:`, error);
    throw new Error("응답 형식이 유효한 JSON이 아닙니다.");
  }
};

export const fetchWordData = async () => {
  return fetchData("/resources/wordData/data.json");
};

export const fetchMetaData = async () => {
  return fetchData("/resources/metaData.json");
};
