import { getImages } from "./src/getImages.ts";
import config from "./config.json" assert { type: "json" };

const images = await getImages(config.accountId, config.apiToken);

console.log(images);
