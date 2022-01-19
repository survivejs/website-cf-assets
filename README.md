# website-cf-assets

These assets are cached on Cloudflare for resizing etc.

## Uploading images

Before uploading, set up `config.json` like below:

**config.json**

```json
{
  "accountId": "todo",
  "apiToken": "todo"
}
```

You can get the account id through Cloudflare UI. [See this blog post to understand how to generate the token](https://www.better.dev/cloudflare-images). The permission you are looking for is called "Cloudflare Images" and it should have "Edit" permissions enabled.

It is important you don't commit this file to the repository for security reasons.

To upload the images, run `deno run -A ./upload-images.ts`.

## Getting images

There's a small helper for getting the uploaded images: `deno run -A ./get-images`.

## Using workers

To get started, copy `denoflare.tpl` as `.denoflare` and make sure you [denoflare](https://denoflare.dev/) installed. Then, to run the local hello, use `denoflare serve hello-local`. There's also an endpoint for getting images: `denoflare serve get-images`.

To publish workers, [follow this tutorial](https://denoflare.dev/guides/push). Note that you might have to publish twice for the worker to show up initially.

## Reference

* [Documentation](https://developers.cloudflare.com/images/)
