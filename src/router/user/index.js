import { redirect } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import { fetchWordData } from "../../utils/api";
import { handleMemberFlow, handleGuestFlow } from "./utils";

/**
 * [Orchestrator] 사용자 데이터를 로드하고 세션 상태에 따라 분기 처리합니다.
 */
export const loadUserData = async () => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    // 1. 공통 데이터 로드 (마스터 데이터 및 알림)
    const [wordData, dbNotisResult] = await Promise.all([
      fetchWordData(),
      supabase.from("Notification").select("*").order("created_at", { ascending: false })
    ]);

    const notifications = dbNotisResult.data || [];

    // 동기화 알림 추가
    notifications.unshift(
      session 
        ? { id: "sync_ok", title: "동기화 완료", content: "현재 계정으로 실시간 데이터 동기화가 활성화되어 있습니다.", type: "status" }
        : { id: "sync_req", title: "데이터 동기화 권장", content: "로그인하여 데이터를 안전하게 보호하세요.", type: "sync" }
    );

    // 2. 세션 여부에 따른 데이터 로딩 흐름 분기
    let result;
    if (session && !sessionError) {
      result = await handleMemberFlow(session, wordData, notifications);
    } else {
      result = handleGuestFlow(wordData, notifications);
    }

    // 3. 리다이렉트 처리
    if (result.redirect) {
      return redirect(result.redirect);
    }

    return result;

  } catch (error) {
    console.error("[loadUserData] Critical Error:", error);
    // 최후의 보루: 게스트 모드 시도 혹은 온보딩 리다이렉트
    return redirect("/onboard/nickname");
  }
};
