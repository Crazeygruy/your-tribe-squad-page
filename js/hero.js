// Hero typewriter (if you want to know how it works lemme know friend)

import { queryMedia } from "./utils.js";

const title = document.querySelector(".hero-title");
const text = document.querySelector(".hero-text");

if (title && text) {
  const phrase = title.getAttribute("aria-label") || "";
  const reducedMotion = queryMedia("(prefers-reduced-motion: reduce)");

  const TYPE_MS = 150;
  const DELETE_MS = 90;
  const HOLD_MS = 1800;
  const EMPTY_MS = 600;
  const START_MS = 400;

  if (phrase && !reducedMotion.matches) {
    let i = 0;

    text.textContent = "";

    const type = () => {
      i += 1;
      text.textContent = phrase.slice(0, i);

      if (i < phrase.length) {
        setTimeout(type, TYPE_MS);
      } else {
        setTimeout(erase, HOLD_MS);
      }
    };

    const erase = () => {
      i -= 1;
      text.textContent = phrase.slice(0, i);

      if (i > 0) {
        setTimeout(erase, DELETE_MS);
      } else {
        setTimeout(type, EMPTY_MS);
      }
    };

    setTimeout(type, START_MS);
  }
}
