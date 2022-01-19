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

Follow [denoflare instructions](https://denoflare.dev/guides/serve) to run the workers.

## Reference

* [Documentation](https://developers.cloudflare.com/images/)
