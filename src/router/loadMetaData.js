/**
 * 기초 메타데이터(총 단어 수 등)를 로드합니다.
 * [Used In] src/router/router.jsx
 */
export const loadMetaData = () => {
  const metaData = fetchMetaData();

  return metaData;
};
