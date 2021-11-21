"use strict";

const boxes = 9;

function createhitbox(boxes) {
  for (let i = 0; i < boxes; i++) {
    const hitbox = document.createElement("div");
    hitbox.className = "divbuttoncontainer";
    hitbox.id = `divbutton${boxes}`;
    document.querySelector(".hitboxcontainer").append(hitbox);
    const button = document.createElement("button");
    button.className = "buttons";
    button.id = `button${boxes}`;
    hitbox.appendChild(button);
  }
}
createhitbox(boxes);
function randomMole() {
  const randomIndex = Math.floor(Math.random() * boxes);
  console.log(randomIndex);
}
randomMole();
