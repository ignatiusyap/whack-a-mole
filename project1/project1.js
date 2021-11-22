"use strict";

document.querySelector("#submitbutton").addEventListener("click", creategame);

function creategame() {
  const playername = document.querySelector("#playername").value;
  if (playername !== "") {
    document.querySelector("#createplayerdiv").style.display = "none";
    const displayname = document.createElement("h3");
    displayname.innerText = `Player name: ${playername}`;
    document.querySelector("#displayername").append(displayname);
    createhitbox(boxes);
    gamestart();
  } else {
    alert("Input a name please");
  }
}

const boxes = 9;
function createhitbox(boxes) {
  for (let i = 0; i < boxes; i++) {
    const hitbox = document.createElement("div");
    hitbox.className = "divbuttoncontainer";
    hitbox.id = `divbutton${i}`;
    document.querySelector(".hitboxcontainer").append(hitbox);
    const button = document.createElement("button");
    button.className = "buttons";
    button.id = `button${i}`;
    hitbox.appendChild(button);
  }
}

function gamestart() {
  const gamestartbutton = document.createElement("button");
  gamestartbutton.id = "gamestart";
  gamestartbutton.innerText = "Start Game";
  document.querySelector("#displayername").appendChild(gamestartbutton);
  document.querySelector("#gamestart").addEventListener("click", gamecycle);
}

function timerstart() {
  function randomMole() {
    const randomIndex = Math.floor(Math.random() * boxes);
    const randombutton = `button${randomIndex}`;
    //console.log(randombutton);
    console.log(document.querySelector(`#${randombutton}`));
  }
  setInterval(randomMole, 3000);
}

// function timerend() {
//   clearInterval();
// }
