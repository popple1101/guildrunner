# GuildRunner Backend (Cloudflare Workers + Supabase, JS)

- DB: Supabase (Postgres + Auth + Realtime)
- Server: Cloudflare Workers (JavaScript, ESM)

## Auth 구조

- 카카오 로그인: Supabase Auth Kakao Provider에서 처리
- 프론트: Supabase로 로그인 후 access_token 획득
- 백엔드(Cloudflare): Authorization Bearer 토큰을 받아서
  Supabase `/auth/v1/user`로 검증 후 게임 API 수행

## 개발

```bash
npm install

## 최신버전
npm install --save-dev wrangler@4

##  서버 실행
npm run dev

## 배포
npm run deploy
