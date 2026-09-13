import { constellations } from "./constellation-data.js";

const stage = document.querySelector("#constellation-stage");

const state = {
  mode: "universe",
  activeConstellation: null,
};

const clearStage = () => {
  stage.replaceChildren();
};

const createStar = ({ position, name, meta, modifier, onClick }) => {
  const star = document.createElement("button");
  star.type = "button";
  star.className = modifier ? `constellation-star ${modifier}` : "constellation-star";
  star.style.left = `${position.x}%`;
  star.style.top = `${position.y}%`;

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

  star.addEventListener("click", onClick);
  return star;
};

const renderUniverse = () => {
  state.mode = "universe";
  state.activeConstellation = null;

  clearStage();

  for (const constellation of constellations) {
    stage.append(
      createStar({
        position: constellation.position,
        name: constellation.name,
        meta: `${constellation.members.length} members`,
        onClick: () => renderConstellation(constellation.id),
      }),
    );
  }
};

const renderConstellation = id => {
  const constellation = constellations.find(item => item.id === id);

  if (!constellation) return;

  state.mode = "constellation";
  state.activeConstellation = id;

  clearStage();

  constellation.members.forEach((member, index) => {
    stage.append(
      createStar({
        position: member.position,
        name: member.name,
        meta: String(index + 1).padStart(2, "0"),
        modifier: "constellation-star--member",
        onClick: () => {},
      }),
    );
  });

  stage.append(
    createStar({
      position: { x: 50, y: 50 },
      name: "Universe",
      modifier: "constellation-star--home",
      onClick: renderUniverse,
    }),
  );
};

const onKeyDown = event => {
  if (event.key === "Escape" && state.mode === "constellation") {
    renderUniverse();
  }
};

if (stage) {
  renderUniverse();
  document.addEventListener("keydown", onKeyDown);
}

