import { redirect } from "react-router-dom";

import { loadLocalStorage } from "../utils/utils";

export const loadPlay = () => {
  let selected = loadLocalStorage("userData").selected;
  const wordMap = loadLocalStorage("wordMap");

  if (wordMap.length < selected) selected = 0;

  return redirect(`/play/${selected}/card/0`);
};
