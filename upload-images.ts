import * as path from "https://deno.land/std@0.113.0/path/mod.ts";
import { getImages } from "./src/getImages.ts";
import config from "./.config.json" with { type: "json" };

uploadImages();

async function uploadImages() {
  const images = (await getImages(config.accountId, config.apiToken)).map((o) =>
    o.filename
  );

  // TODO: Check file size. It looks like 6 mb gif fails to upload
  const files = (await dir("img", [".gif", ".jpg", ".jpeg", ".png", ".svg"]))
    .map((
      o,
    ) => o.path)
    .filter(
      (p) => !images.includes(p),
    );

  if (files.length === 0) {
    console.log("no images to upload");

    return;
  } else {
    console.log("images to upload", files.length);
  }

  // TODO: Check possible errors from Cloudflare (likely in the returned object)
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

type Path = { path: string; name: string };

async function dir(p: string, extensions?: string[]) {
  let ret: Path[] = [];

  for await (const { name, isDirectory } of Deno.readDir(p)) {
    if (isDirectory) {
      ret = ret.concat(await dir(path.join(p, name), extensions));
    } else {
      if (extensions) {
        if (extensions.includes(path.extname(name))) {
          ret.push({ path: path.join(p, name), name });
        }
      } else {
        ret.push({ path: path.join(p, name), name });
      }
    }
  }

  return ret;
}
