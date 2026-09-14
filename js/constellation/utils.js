// Bounyad/Hajar, je hoeft niet in deze folder te werken pookies

import { queryMedia } from "../utils.js";

export { queryMedia };

export const formatIndex = value => String(value).padStart(2, "0");

export const hashName = name =>
  [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);

export const directionBetween = (from, to) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;

  return { x: dx / length, y: dy / length };
};

export const clamp = (value, min = 6, max = 94) =>
  Math.min(max, Math.max(min, value));

export const applyFloat = (star, name, isTouch) => {
  const hash = hashName(name);
  const scale = isTouch ? 0.5 : 1;
  const driftX = ((hash % 8) + 3) * scale;
  const driftY = (((hash >> 2) % 8) + 3) * scale;

  star.style.setProperty("--float-duration", `${5 + (hash % 5)}s`);
  star.style.setProperty("--float-delay", `-${(hash % 4) + 1}s`);
  star.style.setProperty("--float-x", `${driftX.toFixed(1)}px`);
  star.style.setProperty("--float-y", `${driftY.toFixed(1)}px`);
};