// import { Image } from "skia-canvas";
// export const loadImage = (src) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = (e) => {
//       conosle.log(e);
//       reject(new Error(`Could not load image at ${src}`));
//       img.src = src;
//     }
//   });
// };

export const count = (arr, item) => arr.filter(c => c == item).length;

export const getUnique4 = (tokens) => {
  let arr = [...tokens];
  let c = {}, x = 0;

  ["red", "blue", "green", "yellow"].forEach(b => c[b] = count(arr, c));

  arr.forEach((v, i) => {
    if (arr.filter(a => a !== 0).length <= 4) return;
    if (v.color == Object.keys(c)[x] && Object.values(c)[x] !== 1) arr[i] = 0; c[x] -= 1;
    x++; if (x > 3) x = 0;
  });

  arr = arr.filter(i => i !== 0);
  return arr;
}