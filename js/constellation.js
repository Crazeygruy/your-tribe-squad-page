import { constellations } from "./constellation-data.js";

const stage = document.querySelector("#constellation-stage");

const state = {
  mode: "universe",
  activeConstellation: null,
};

const createStar = constellation => {
  const star = document.createElement("button");
  star.type = "button";
  star.className = "constellation-star";
  star.dataset.constellation = constellation.id;
  star.style.left = `${constellation.position.x}%`;
  star.style.top = `${constellation.position.y}%`;

  const point = document.createElement("span");
  point.className = "constellation-star-point";
  point.setAttribute("aria-hidden", "true");

  const name = document.createElement("span");
  name.className = "constellation-star-name";
  name.textContent = constellation.name;

  const meta = document.createElement("span");
  meta.className = "constellation-star-meta";
  meta.textContent = `${constellation.members.length} members`;

  star.append(point, name, meta);
  star.addEventListener("click", () => {
    state.mode = "constellation";
    state.activeConstellation = constellation.id;
  });

  return star;
};

if (stage) {
  constellations.forEach(constellation => stage.append(createStar(constellation)));
}
