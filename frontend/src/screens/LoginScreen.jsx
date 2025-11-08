import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
import { signInWithKakao, signOut, subscribeAuthLink } from "../auth/kakaoAuth";

export default function LoginScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 현재 세션 가져오기
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));

    // 세션 변화 구독
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, sess) => {
      setUser(sess?.user ?? null);
    });

    // 딥링크 리스너
    const off = subscribeAuthLink();

    return () => {
      sub?.subscription?.unsubscribe?.();
      off?.();
    };
  }, []);

  return (
    <View style={s.wrap}>
      <Text style={s.title}>GuildRunner</Text>

      {user ? (
        <>
          <Text style={s.txt}>로그인됨: {user.email || user.user_metadata?.name || user.id}</Text>
          <TouchableOpacity style={s.btn} onPress={signOut}>
            <Text style={s.btnTxt}>로그아웃</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={s.txt}>카카오로 로그인해 주세요.</Text>
          <TouchableOpacity style={s.btn} onPress={signInWithKakao}>
            <Text style={s.btnTxt}>카카오 로그인</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 24 },
  title: { fontSize: 22, fontWeight: "700" },
  txt: { fontSize: 14, opacity: 0.8 },
  btn: { paddingVertical: 12, paddingHorizontal: 18, borderWidth: 1, borderRadius: 10 },
  btnTxt: { fontSize: 16, fontWeight: "600" },
});
