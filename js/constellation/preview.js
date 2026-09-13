// ook hier niet

import { formatIndex } from "./utils.js";

export const createPreview = () => {
  const panel = document.createElement("div");
  panel.className = "member-preview";
  panel.setAttribute("aria-hidden", "true");

  const image = document.createElement("img");
  image.className = "member-preview-image";
  image.alt = "";

  const name = document.createElement("span");
  name.className = "member-preview-name";

  const index = document.createElement("span");
  index.className = "member-preview-index";

  const action = document.createElement("a");
  action.className = "member-preview-action";
  action.target = "_blank";
  action.rel = "noopener noreferrer";
  action.tabIndex = -1;
  action.textContent = "View project ↗";

  const info = document.createElement("div");
  info.className = "member-preview-info";
  info.append(name, index, action);

  panel.append(image, info);
  return panel;
};

export const showPreview = (ctx, member, index, total) => {
  const { preview, state, isTouch } = ctx;

  preview.querySelector(".member-preview-image").src = member.screenshot;
  preview.querySelector(".member-preview-name").textContent = member.name;
  preview.querySelector(".member-preview-index").textContent =
    `${formatIndex(index)} / ${formatIndex(total)}`;
  preview.querySelector(".member-preview-action").href = member.url;

  if (isTouch) {
    preview.classList.add("member-preview--center");
    preview.style.left = "50%";
    preview.style.top = "50%";
  } else {
    preview.classList.toggle("member-preview--west", member.position.x > 50);
    preview.classList.toggle("member-preview--north", member.position.y > 70);
    preview.classList.toggle("member-preview--south", member.position.y < 30);
    preview.style.left = `${member.position.x}%`;
    preview.style.top = `${member.position.y}%`;
  }

  preview.classList.add("is-visible");
  state.hoveredMember = member.id;
};

export const hidePreview = (ctx, event) => {
  const { preview, state } = ctx;

  if (event?.relatedTarget?.closest?.(".member-preview")) return;

  preview.classList.remove("is-visible");
  state.hoveredMember = null;
};

export const bindPreview = (ctx, star, member, index, total) => {
  const show = () => showPreview(ctx, member, index, total);

  star.addEventListener("mouseenter", show);
  star.addEventListener("focus", show);
  star.addEventListener("mouseleave", event => hidePreview(ctx, event));
  star.addEventListener("blur", event => hidePreview(ctx, event));

  // On touch there is no hover, so a tap toggles the preview instead of
  // following the profile link straight away.
  if (ctx.isTouch) {
    star.addEventListener("click", event => {
      if (ctx.state.hoveredMember === member.id) {
        ctx.state.hoveredMember = null;
        return;
      }

      event.preventDefault();
      showPreview(ctx, member, index, total);
    });
  }
};

// The preview panel sits outside the star, so leaving it via its link has
// to hide it too. Bound once from the render logic, not per star.
export const bindPreviewActionBlur = (ctx, action) => {
  action.addEventListener("blur", event => hidePreview(ctx, event));
};