import * as path from "https://deno.land/std@0.113.0/path/mod.ts";
import { getImages } from "./src/getImages.ts";
import config from "./config.json" assert { type: "json" };

uploadImages();

async function uploadImages() {
  const images = (await getImages(config.accountId, config.apiToken)).map((o) =>
    o.filename
  );

  const files = (await dir("img", [".jpg", ".png", ".svg"])).map((o) => o.path)
    .filter(
      (p) => !images.includes(p),
    );

  if (files.length === 0) {
    console.log("no images to upload");

    return;
  } else {
    console.log("images to upload", files.length);
  }

  for (const file of files) {
    console.log("uploading", file);
    await upload(config.accountId, config.apiToken, file);
    console.log("uploaded", file);
  }
}

async function upload(accountId: string, token: string, p: string) {
  const form = new FormData();

  form.append("file", new Blob([await Deno.readFile(p)]), p);

  return fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    },
  );
}

async function dir(p: string, extensions?: string[]) {
  const ret = [];

  for await (const { name } of Deno.readDir(p)) {
    if (extensions) {
      if (extensions.includes(path.extname(name))) {
        ret.push({ path: path.join(p, name), name });
      }
    } else {
      ret.push({ path: path.join(p, name), name });
    }
  }

  return ret;
}
