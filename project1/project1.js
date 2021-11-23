"use strict";

document.querySelector("#submitbutton").addEventListener("click", creategame);

function creategame() {
  const playername = document.querySelector("#playername").value;
  if (playername !== "") {
    document.querySelector("#createplayerdiv").style.display = "none";
    const displayname = document.createElement("h3");
    displayname.innerText = `Player name: ${playername}`;
    document.querySelector("#displayername").append(displayname);
    creategridlist();
    createhitbox(boxes);
    gamestart();
  } else {
    alert("Input a name please");
  }
}

let boxes = 9;
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
function creategridlist() {
  const createList = document.createElement("label");
  createList.setAttribute("for", "grid-size");
  createList.innerText = "Choose grid size";
  const listOptions = document.createElement("select");
  listOptions.id = "grid-size";
  const grid3 = document.createElement("option");
  grid3.value = "Easy";
  grid3.innerText = "Easy";
  const grid4 = document.createElement("option");
  grid4.value = "Medium";
  grid4.innerText = "Medium";
  const grid5 = document.createElement("option");
  grid5.value = "Hard";
  grid5.innerText = "Hard";
  document.querySelector("#gameoptions").appendChild(createList);
  document.querySelector("#gameoptions").appendChild(listOptions);
  listOptions.append(grid3, grid4, grid5);
}
// After player set the options, the options are removed from the panel.
//
//document.querySelector("#gamestart").addEventListener("click", timerstart);
function gamestart() {
  const gamestartbutton = document.createElement("button");
  gamestartbutton.id = "gamestart";
  gamestartbutton.innerText = "Start Game";
  const labelforgrid = document.createElement("label");
  document.querySelector("#displayername").appendChild(gamestartbutton);
  document.querySelector("#gamestart").addEventListener("click", timerstart);
}
let count = 0;
let timerstop = null;
function timerstart() {
  timerstop = setInterval(randomMole,2000);
}

function randomMole() {
  count +=1;
  if (count <4){
  document.querySelector("#gameoptions").style.display = "none";

  const randomIndex = Math.floor(Math.random() * boxes);
  const randombutton = `button${randomIndex}`;
  document.querySelector(`#${randombutton}`).style.backgroundColor = "red";
  //document.querySelector(`#${randombutton}`).addEventListener("click",positivehit)
  //console.log(randombutton);
  document.querySelector("#gamestart").innerText = "Restart";
  document.querySelector("#gamestart").addEventListener("click", restart);
  console.log(count ,randombutton);
  } else {
    clearInterval(timerstop);
    console.log("count ended");
  };
  
  }
  
function restart() {
  window.location.reload();
  //document.body.reset();
}
// create the list options for time
  // const createTime = document.createElement("label");
  // createTime.setAttribute("for","timer");
  // createTime.innerText = "Choose time"
  // const timeOptions = document.createElement("select");
  // timeOptions.id = "timer";
  // const time1 = document.createElement("option");
  // time1.value = "60 seconds";