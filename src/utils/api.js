const currentMode = import.meta.env.MODE;
const isProd = currentMode === "production";

const basename = isProd ? "/MyVoca" : "";

const fetchData = async (path) => {
  const res = await fetch(path);

  if (!res.ok) {
    throw new Error(`${path} : 데이터 패칭에 실패했습니다.`);
  }

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`${path} : 데이터 파싱에 실패했습니다.`);
  }
};

export const fetchWordData = async () => {
  return fetchData(`${basename}/resources/wordData/data.json`);
};

export const fetchMetaData = async () => {
  return fetchData(`${basename}/resources/metaData.json`);
};
