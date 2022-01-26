// Adapted from https://developers.cloudflare.com/workers/examples/cache-api
import type { ModuleWorkerContext } from "https://raw.githubusercontent.com/skymethod/denoflare/v0.4.4/common/cloudflare_workers_types.d.ts";

export default {
  fetch(
    request: Request,
    env: { imageRoot: string },
    ctx: ModuleWorkerContext,
  ) {
    try {
      return handleRequest(env.imageRoot, request, ctx);
    } catch (e) {
      return new Response(e.message, { status: 403 });
    }
  },
};

const oneHourInSeconds = 60 * 60;
const oneDay = oneHourInSeconds * 24;
const thirtyDays = oneDay * 30;

async function handleRequest(
  imageRoot: string,
  request: Request,
  ctx: ModuleWorkerContext,
) {
  const cacheUrl = new URL(request.url);
  const { searchParams } = cacheUrl;

  if (!searchParams.has("image") || !searchParams.has("type")) {
    throw "Expected parameters are missing.";
  }

  const image = searchParams.get("image");
  const type = searchParams.get("type");

  // The assumption here is that imageRoot already has a / at the end
  const targetUrl = imageRoot + image + "/" + type;

  // Construct the cache key from the target URL
  const cacheKey = new Request(targetUrl, request);

  // @ts-ignore This exists in the environment
  const cache = caches.default;

  // Check whether the value is already available in the cache
  // if not, you will need to fetch it from origin, and store it in the cache
  // for future access
  let response = await cache.match(cacheKey);

  if (!response) {
    // If not in cache, get it from origin
    response = await fetch(targetUrl);

    // Must use Response constructor to inherit all of response's fields
    response = new Response(response.body, response);

    // Cache API respects Cache-Control headers. For example, setting
    // s-max-age to 10 will limit the response to be in cache for 10 seconds max

    // Any changes made to the response here will be reflected in the cached value
    response.headers.append("Cache-Control", `s-maxage=${thirtyDays}`);

    // Store the fetched response as cacheKey

    ctx.waitUntil(cache.put(cacheKey, response.clone()));

    await cache.put(cacheKey, response.clone());
  }

  return response;
}
