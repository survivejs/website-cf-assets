import { getImages } from "../src/getImages.ts";

export default {
  async fetch(_request: Request, env: { accountId: string; apiToken: string }) {
    try {
      const images: string[] = await getImages(env.accountId, env.apiToken);

      return new Response(JSON.stringify(images), {
        headers: { "content-type": "application/json;charset=UTF-8" },
      });
    } catch (e) {
      return new Response(e.message);
    }
  },
};
