import config from "./config.json" assert { type: "json" };

const images = await getImages(config.accountId, config.token);

console.log(images);

async function getImages(accountId: string, token: string) {
  let page = 1;
  let ret: string[] = [];
  let images = [];

  do {
    // Reference: https://api.cloudflare.com/#cloudflare-images-list-images
    images = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1?page=${page}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => res.json()).then(({ result: { images } }) => images);

    ret = ret.concat(images);
    page++;
  } while (images.length);

  return ret;
}
