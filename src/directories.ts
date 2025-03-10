const src = "src/";
const http = "/";
const resources = "/resources";
const folders = {
  src: {
    root: src,
    actors: src + "actors/",
    data: src + "data/",
    helpers: src + "helpers/",
    lib: src + "lib/",
    scenes: src + "scenes/",
    types: src + "types/",
  },
  http: {
    root: http,
    assets: {
      root: http + "assets/",
      models: http + "assets/models/",
      images: http + "assets/images/",
    },
    icons: {
      root: http + "icons/",
    },
  },
  resources: {
    root: resources,
    assets: {
      root: resources + "assets/",
      models: resources + "assets/models/",
      images: resources + "assets/images/",
    },
    icons: resources + "assets/icons/",
  },
};

const enemy = `${folders.http.assets.models}enemy.glb`;
const dummy = `${folders.http.assets.models}dummy.glb`;
const fireProjectile1 = `${folders.http.assets.models}FireProjectile1.glb`;

export { dummy, enemy, fireProjectile1 };
