const env = {
  STAGE: process.env.EXPO_PUBLIC_ENV || "development",
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  API_BASE: process.env.EXPO_PUBLIC_API_BASE,
  APP_SCHEME: process.env.EXPO_PUBLIC_APP_SCHEME || "guildrunner",
  ANDROID_PACKAGE: process.env.EXPO_PUBLIC_ANDROID_PACKAGE || "com.guildrunner",
  KAKAO_NATIVE_KEY: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY || "",
};

["SUPABASE_URL", "SUPABASE_ANON_KEY", "APP_SCHEME"].forEach((k) => {
  if (!env[k]) console.warn(`[env] ${k} 값이 비어있음`);
});

export default env;
