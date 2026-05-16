import { supabase } from "../common/supabase";

/**
 * 특정 사용자의 프로필 정보를 조회합니다.
 * @param {string} userId - Supabase 사용자 UUID
 * @returns {Promise<Object|null>} 사용자 프로필 정보 객체 또는 null
 */
export const getUserProfile = async (userId) => {
  if (!userId) return null;

  try {
    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("[API/User] Get Profile Error:", error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("[API/User] Critical Profile Error:", err);
    return null;
  }
};
