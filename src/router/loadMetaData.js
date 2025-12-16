import { fetchMetaData } from "../utils/api";

export const loadMetaData = () => {
  const metaData = fetchMetaData();

  return metaData;
};
