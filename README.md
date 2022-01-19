# website-cf-assets

These assets are cached on Cloudflare for resizing etc. This repository contains a script to upload assets and a worker to fetch references to them from Cloudflare.

The code in the repository depends on [Deno](https://deno.land/) and [velociraptor](https://velociraptor.run/) so make sure you have those installed. Run `vr` to see the all available commands.

## Uploading images

Before uploading, set up `config.json` like below:

**config.json**

```json
{
  "accountId": "todo",
  "apiToken": "todo",
  "getImagesEndpoint": "todo",
  "getImagesToken": "todo"
}
```

You can get the account id through Cloudflare UI. [See this blog post to understand how to generate the token](https://www.better.dev/cloudflare-images). The permission you are looking for is called "Cloudflare Images" and it should have "Edit" permissions enabled.

It is important you don't commit this file to the repository for security reasons.

To upload the images from the `img` directory, run `vr upload-images`.

## Getting images

There's a small helper for getting the uploaded images: `vr get-images`. Underneath this uses CloudFlare API.

The same can also be done via a worker.

## Using workers

To get started, copy `denoflare.tpl` as `.denoflare` and make sure you [denoflare](https://denoflare.dev/) installed. To run the worker locally, use `vr serve-get-images`.

To publish, use `publish-get-images`. For this, you have to take care to configure Cloudflare first so that workers are enabled.

Once it's running, you'll have something like `https://get-images.mynamespace.workers.dev/` and you can access the images over the web. The resource is useful when you have to use the images elsewhere (i.e. for static generation).

## Reference

* [Images documentation](https://developers.cloudflare.com/images/)
* [Workers documentation](https://developers.cloudflare.com/workers/)
