import { redirect } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { loadLocalStorage } from "../utils/utils";

/**
 * 학습(Play) 페이지 진입 시 마지막 학습 위치 또는 기본 위치로 리다이렉트합니다.
 * TODO: Guest 유저의 경우 wordMap -> wordMaps 구조 변경 대응 필요.
 * [Used In] src/router/router.jsx
 */
export const loadPlay = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  // 1. OAuth 로그인 유저: 일단 기본 0으로 이동 (추후 DB에 마지막 학습 위치 저장 가능)
  if (session) {
    return redirect(`/play/0/card/0`);
  }

  // 2. Guest 유저: LocalStorage 데이터 사용
  const userData = loadLocalStorage("userData");
  const wordMap = loadLocalStorage("wordMap");

  if (!userData || !wordMap) {
    return redirect("/onboard");
  }

  let selected = userData.selected || 0;
  if (wordMap.length <= selected) selected = 0;

  return redirect(`/play/${selected}/card/0`);
};
