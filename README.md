# website-cf-assets

These assets are cached on Cloudflare for resizing etc. This repository contains a script to upload assets and a worker to fetch references to them from Cloudflare.

The code in the repository depends on [Deno](https://deno.land/) and [velociraptor](https://velociraptor.run/) so make sure you have those installed. Run `vr` to see the all available commands.

## Uploading images

Before uploading, set up `config.json` like below:

**.config.json**

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

The repository includes the following workers:

* `get-images` returns a JSON of all the images uploaded to Cloudflare Images
* `get-cached-image` allows you to fetch an image from Cloudflare cache to avoid hitting Cloudflare Images directly as doing this is cheaper

To get started with the workers, copy `denoflare.tpl.json` as `.denoflare` and make sure you [denoflare](https://denoflare.dev/) installed.

To run a worker locally, use `vr worker:serve-<worker name>`.

To publish, use `worker:publish-<worker name>`. For this, you have to take care to configure Cloudflare first so that workers are enabled. After initial publish, you have to enable the route through the `Triggers` tab related to the worker at Cloudflare UI.

Once it's running, you'll have something like `https://<worker name>.mynamespace.workers.dev/` available for the worker.

## Reference

* [Images documentation](https://developers.cloudflare.com/images/)
* [Workers documentation](https://developers.cloudflare.com/workers/)

## TODO

* Explore the usage of KV storage for caching image references. Doing this would be worthwhile with a large amount of images as this would speed up the image lookup in the worker.

## Caveats

* If you are not careful, this can get expensive. [Source](https://blog.klungo.no/2021/12/07/cloudflare-images-has-a-lot-of-issues/). [The HN thread](https://news.ycombinator.com/item?id=29474743) lists affordable options with similar capabilities.
* SVGs don't seem to be supported at the moment so although they are uploaded, they won't show up in the image index!
