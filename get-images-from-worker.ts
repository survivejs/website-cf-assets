import config from "./.config.json" assert { type: "json" };

const images = await fetch(config.getImagesEndpoint, {
  headers: {
    Authorization: `Bearer ${config.getImagesToken}`,
  },
}).then((res) => res.json()).catch((err) => console.error(err));

console.log(images);
