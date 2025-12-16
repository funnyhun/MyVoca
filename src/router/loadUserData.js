import { redirect } from "react-router-dom";
import { loadLocalStorage } from "../utils/loadLocalStorage";

export const loadUserData = async () => {
  const nick = loadLocalStorage("nick");
  const wordMap = loadLocalStorage("wordMap");
  const userData = loadLocalStorage("userData");

  if (!nick) return redirect("/onboard/nickname");
  if (!wordMap || !userData) return redirect("/loading/generate-data");

  return {
    nick,
    wordMap,
    userData,
  };
};
