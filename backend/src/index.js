import { route } from "./router.js";

export default {
  async fetch(request, env, ctx) {
    try {
      return await route(request, env, ctx);
    } catch (err) {
      console.error("Unhandled error:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};
