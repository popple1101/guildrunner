import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { makeRedirectUri } from "expo-auth-session";
import env from "../lib/env";
import { supabase } from "../lib/supabase";

WebBrowser.maybeCompleteAuthSession();

// 앱으로 돌아올 딥링크 (app.json 의 "scheme"와 맞아야 함)
export const REDIRECT_TO = makeRedirectUri({
  native: `${env.APP_SCHEME}://auth-callback`,
});

export function subscribeAuthLink() {
  // 브라우저 → 앱 복귀 시 code 교환
  const sub = Linking.addEventListener("url", async ({ url }) => {
    try {
      await supabase.auth.exchangeCodeForSession({ url });
    } catch (e) {
      console.warn("[exchangeCodeForSession] failed:", e?.message);
    }
  });
  return () => sub.remove();
}

export async function signInWithKakao() {
  // 브라우저 자동 리다이렉트 막고 URL만 받아서 수동으로 오픈
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: { redirectTo: REDIRECT_TO, skipBrowserRedirect: true },
  });
  if (error) throw error;

  // 외부 브라우저로 열고, 성공 시 res.url에 딥링크가 담겨 돌아옴
  const res = await WebBrowser.openAuthSessionAsync(data.url, REDIRECT_TO);
  if (res.type === "success" && res.url) {
    await supabase.auth.exchangeCodeForSession({ url: res.url });
  }
}

export async function signOut() {
  await supabase.auth.signOut();
}
