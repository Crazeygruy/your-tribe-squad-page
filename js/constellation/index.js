// Ook niet in deze

import { queryMedia } from "./utils.js";
import { onKeyDown, renderUniverse } from "./render.js";

const stage = document.querySelector("#constellation-stage");
const section = document.querySelector(".constellation");

export const initConstellation = () => {
  if (!stage || !section) return;

  const ctx = {
    stage,
    section,
    state: {
      mode: "universe",
      activeConstellation: null,
      hoveredMember: null,
      isTravelling: false,
    },
    reducedMotion: queryMedia("(prefers-reduced-motion: reduce)"),
    isTouch: queryMedia("(hover: none)").matches,
    preview: null,
    announcer: null,
  };

  ctx.announcer = document.createElement("p");
  ctx.announcer.className = "visually-hidden";
  ctx.announcer.setAttribute("aria-live", "polite");
  section.append(ctx.announcer);

  renderUniverse(ctx);

  document.addEventListener("keydown", event => onKeyDown(ctx, event));
};