import { createClient } from "@supabase/supabase-js";
import env from "./env";

// 클라 전용 설정
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false, // 딥링크로 직접 처리하므로 false
  },
});
