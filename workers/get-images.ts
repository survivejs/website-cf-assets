import { getImages } from "../src/getImages.ts";

// A good optimization here would be to write images to a KV store on upload
// and then read the images from a KV store here. Reading from the Cloudflare
// API comes with some lag due to multiple requests but for small amounts of
// images that's acceptable.
//
// Another good addition would be securing the end point with an auth key.
export default {
  async fetch(_request: Request, env: { accountId: string; apiToken: string }) {
    try {
      const images = await getImages(env.accountId, env.apiToken);

      return new Response(JSON.stringify(images), {
        headers: { "content-type": "application/json;charset=UTF-8" },
      });
    } catch (e) {
      return new Response(e.message);
    }
  },
};
