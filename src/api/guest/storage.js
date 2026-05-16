/**
 * Guest 유저 전용 로컬스토리지 접근 유틸리티
 */

const KEYS = {
  NICK: "nick",
  WORD_MAP: "wordMap",
  USER_DATA: "userData",
  THEME: "theme",
};

/**
 * 로컬스토리지에서 데이터를 읽어옵니다.
 * @param {string} key - KEYS 객체에 정의된 키 이름
 * @returns {any} 파싱된 데이터 또는 null
 */
export const getStorageItem = (key) => {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch (e) {
      // JSON 파싱 실패 시 단순 문자열로 반환
      return item;
    }
  } catch (err) {
    console.error(`[API/Guest] Storage Read Error (${key}):`, err);
    return null;
  }
};

/**
 * 로컬스토리지에 데이터를 저장합니다.
 * @param {string} key - KEYS 객체에 정의된 키 이름
 * @param {any} value - 저장할 데이터
 */
export const setStorageItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`[API/Guest] Storage Write Error (${key}):`, err);
  }
};

/**
 * 로컬스토리지에서 데이터를 삭제합니다.
 * @param {string} key - KEYS 객체에 정의된 키 이름
 */
export const removeStorageItem = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    console.error(`[API/Guest] Storage Remove Error (${key}):`, err);
  }
};

/**
 * 로컬스토리지의 모든 데이터를 삭제합니다.
 */
export const clearStorage = () => {
  try {
    window.localStorage.clear();
  } catch (err) {
    console.error("[API/Guest] Storage Clear Error:", err);
  }
};

/**
 * 현재 사용자가 게스트인지 확인합니다 (인증 토큰 존재 여부 기준).
 * @returns {boolean}
 */
export const checkIsGuest = () => {
  try {
    return !Object.keys(window.localStorage).some((k) => k.includes("auth-token"));
  } catch (err) {
    return true;
  }
};

export { KEYS };
