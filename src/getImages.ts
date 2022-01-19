// TODO: Maybe this should return a promise so possible error
// can be handled easier.
async function getImages(accountId: string, token: string) {
  let page = 1;
  // TODO: Find the type from cloudflare
  let ret: {
    id: string;
    filename: string;
    uploaded: string;
    requireSignedURLs: boolean;
    variants: string[];
  }[] = [];
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
    ).then((res) => res.json()).then(({ result: { images } }) => images).catch(
      (err) => console.error(err),
    );

    ret = ret.concat(images);
    page++;
  } while (images.length);

  return ret;
}

export { getImages };
