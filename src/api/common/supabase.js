import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing in environment variables.");
}

/**
 * Supabase 클라이언트 인스턴스입니다.
 * [Used In] src/api/* (DB 통신 모듈)
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
