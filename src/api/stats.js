import { getSession } from "./auth/session";
import { updateGuestLearningStats } from "./guest/stats";

/**
 * 학습 통계(연속 학습일, 오늘 학습량)를 업데이트합니다.
 * [Used In] src/pages/Play/Card/Complete.jsx, src/pages/Play/Quiz/Complete.jsx
 */
export const updateLearningStats = async () => {
  try {
    const session = await getSession();

    if (session) {
      // (향후) 멤버용 DB 통계 업데이트 로직 추가 가능
      // await updateUserLearningStats(session.user.id);
      
      // 현재는 멤버도 로컬 데이터를 캐시로 사용하므로 게스트 로직 병행 가능
      updateGuestLearningStats();
    } else {
      updateGuestLearningStats();
    }
  } catch (error) {
    console.error("[Facade/Stats] updateLearningStats Error:", error);
  }
};
