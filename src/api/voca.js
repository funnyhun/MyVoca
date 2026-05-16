import { getSession } from "./auth/session";
import { updateUserWordStatus } from "./user/voca";
import { updateGuestWordStatus } from "./guest/voca";
import { initWordMap, initUserData } from "./common/voca";

/**
 * 유저의 상태(Member/Guest)에 따라 적절한 단어 학습 상태 업데이트 API를 호출합니다.
 * 
 * @param {string|number} wordId - 업데이트할 단어 ID
 * @param {boolean} status - 학습 완료 여부
 * @returns {Promise<{success: boolean, error?: any}>} 결과 객체
 */
export const updateWordStatus = async (wordId, status) => {
  try {
    const session = await getSession();
    
    if (session) {
      return await updateUserWordStatus(session.user.id, wordId, status);
    } else {
      return { success: updateGuestWordStatus(wordId, status) };
    }
  } catch (error) {
    console.error("[Facade/Voca] updateWordStatus Error:", error);
    return { success: false, error };
  }
};

/**
 * 앱 초기 데이터를 설정합니다. (공통 초기화 로직 위임)
 * [Used In] src/pages/Settings/Settings.jsx, src/onboard/StepToData.jsx
 * 
 * @param {string} level - 선택된 난이도 레벨
 * @param {Function} setStatus - 진행률 업데이트 콜백 (0-100)
 * @returns {Promise<boolean>} 성공 여부
 */
export const initializeAppData = async (level, setStatus) => {
  try {
    // UI UX를 위한 더미 프로그레스 처리
    const dummyProgress = (duration) => {
      const steps = 100;
      const interval = duration / steps;
      let currentStep = 0;
      return new Promise((res) => {
        const timer = setInterval(() => {
          currentStep++;
          const progress = Math.min(99, Math.floor((currentStep / steps) * 99));
          setStatus(progress);
          if (currentStep >= steps) {
            clearInterval(timer);
            res();
          }
        }, interval);
      });
    };

    // 공통 로직 호출
    await Promise.all([
      initWordMap(), 
      initUserData(level), 
      dummyProgress(2000)
    ]);
    
    setStatus(100);
    return true;
  } catch (error) {
    console.error("[Facade/Voca] initializeAppData Error:", error);
    return false;
  }
};
