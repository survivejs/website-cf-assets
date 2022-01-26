import { getImages } from "../src/getImages.ts";

// A good optimization here would be to write images to a KV store on upload
// and then read the images from a KV store here. Reading from the Cloudflare
// API comes with some lag due to multiple requests but for small amounts of
// images that's acceptable.
export default {
  async fetch(
    request: Request,
    env: { cfAccountId: string; cfApiToken: string; apiSecret: string },
  ) {
    const { protocol } = new URL(request.url);

    // In the case of a "Basic" authentication, the exchange
    // MUST happen over an HTTPS (TLS) connection to be secure.
    if (
      "https:" !== protocol ||
      "https" !== request.headers.get("x-forwarded-proto")
    ) {
      throw "Please use a HTTPS connection.";
    }

    // Adapted from https://developers.cloudflare.com/workers/examples/auth-with-headers
    if (request.headers.get("Authorization") !== `Bearer ${env.apiSecret}`) {
      return new Response("You need to login.", { status: 401 });
    }

    try {
      const images = await getImages(env.cfAccountId, env.cfApiToken);

      return new Response(JSON.stringify(images), {
        headers: { "content-type": "application/json;charset=UTF-8" },
      });
    } catch (e) {
      return new Response(e.message);
    }
  },
};
