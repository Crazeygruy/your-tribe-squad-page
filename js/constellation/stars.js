// hier ook niet

import { applyFloat } from "./utils.js";

export const createStar = (ctx, {
  position,
  name,
  meta,
  modifier,
  onClick,
  href,
  delay = 0,
}) => {
  const star = document.createElement(href ? "a" : "button");
  star.className = modifier ? `constellation-star ${modifier}` : "constellation-star";
  star.style.left = `${position.x}%`;
  star.style.top = `${position.y}%`;
  star.style.setProperty("--delay", `${delay}ms`);
  applyFloat(star, name, ctx.isTouch);

  if (href) {
    star.href = href;
    star.target = "_blank";
    star.rel = "noopener noreferrer";
  } else {
    star.type = "button";
    star.addEventListener("click", onClick);
  }

  const point = document.createElement("span");
  point.className = "constellation-star-point";
  point.setAttribute("aria-hidden", "true");

  const label = document.createElement("span");
  label.className = "constellation-star-name";
  label.textContent = name;

  star.append(point, label);

  if (meta) {
    const metaElement = document.createElement("span");
    metaElement.className = "constellation-star-meta";
    metaElement.textContent = meta;
    star.append(metaElement);
  }

  return star;
};