import { redirect } from "react-router-dom";

import { loadLocalStorage, calculateDate } from "../utils/utils";

export const loadUserData = async () => {
  const nick = loadLocalStorage("nick");
  const wordMap = loadLocalStorage("wordMap");
  const userData = loadLocalStorage("userData");

  if (!nick) return redirect("/onboard/nickname");
  if (!wordMap || !userData) return redirect("/onboard/generate-data");

  return {
    nick,
    wordMap,
    userData,
  };
};
