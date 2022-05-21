// import { loadImage } from "./utils.js";
import { loadImage } from "skia-canvas";
import { join, dirname } from "path";
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

let tokens = {};

["red", "blue", "green", "yellow"].forEach(color => {
  let letters = "abcd";
  for (let i = 0; i < 4; i++) tokens[`${color}_${letters[i]}`] = join(__dirname, `../../../assets/images/tokens/${color}.${letters[i]}.png`);
});

const assets = {
  board: join(__dirname, '../../../assets/images/board.png'),
  ...tokens
};

export default (async () => {
  let promises = Object.keys(assets).map(key => loadImage(assets[key]));
  const images = await Promise.all(promises);
  Object.keys(assets).map((key, index) => { assets[key] = images[index]; });
  return assets;
})();