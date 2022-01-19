import config from "./config.json" assert { type: "json" };

import * as path from "https://deno.land/std@0.113.0/path/mod.ts";

const files = (await dir("img", [".jpg", ".png"])).map((o) => o.path);

for (const file of files) {
  console.log("uploading", file);
  await upload(config.accountId, config.token, file);
  console.log("uploaded", file);
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
