# website-cf-assets

These assets are cached on Cloudflare for resizing etc.

## Uploading images

Before uploading, set up `config.json` like below:

**config.json**

```json
{
  "account": "todo",
  "token": "todo"
}
```

You can get the account id through CloudFlare UI. [See this blog post to understand how to generate the token](https://www.better.dev/cloudflare-images).

It is important you don't commit this file to the repository for security reasons.

To upload the images, run `deno run -A ./mod.ts`.

## Reference

* [Documentation](https://developers.cloudflare.com/images/)
