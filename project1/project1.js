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
let timeIntervalforfunctions = 2000;
let successfulhit = 0;
//global variable needed to be declared for the timerstop variable to be overridden with timerstart function. Random mol is initialised using the set interval here.
function timerstart() {
  timerstop = setInterval(randomMole, timeIntervalforfunctions);
  // let timerstop = setInterval(() => {
  //   randomMole;
  // }, 2000);
  // return timerstop; does not work
  //wrapper function works as this variable is defined. if not it will go to the default window object.
}

function randomMole() {
  count += 1;
  if (count < 10) {
    //to hide the game options
    document.querySelector("#gameoptions").style.display = "none";
    // This is the mole
    const randomIndex = Math.floor(Math.random() * boxes);
    const randombutton = `button${randomIndex}`;
    document.querySelector(`#${randombutton}`).style.backgroundColor = "red";
    // This is what changes the button back to the orignal color
    function changecolorofbutton() {
      document.querySelector(`#${randombutton}`).style.backgroundColor = "";
      console.log("IT WORKS. MIMICKING ONE MOLE");
    }
    setTimeout(changecolorofbutton, timeIntervalforfunctions);
    //document.querySelector(`#${randombutton}`).addEventListener("click",positivehit)
    //const hitmole = document.querySelector(".divbuttoncontainer");
    const hitmole = document.querySelector(`#${randombutton}`);
    function addEventmole() {
      hitmole.addEventListener("mousedown", registerHit, { once: true });
    }
    addEventmole();

    // Remove event handler is harder to use because the button tag needs to have an onclick function attached to it. SO expiring the addEventListener would be better.
    // function removeEventmole() {
    //   hitmole.removeEventListener("click", addEventmole);
    //   console.log("This is event removal");
    // }
    //removeEventmole();
    //setInterval(removeEventmole, timeIntervalforfunctions); click plus timer will proc it
    //setTimeout(removeEventmole, timeIntervalforfunctions);
    //console.log(successfulhit);
    //Restart button at any point of time.
    document.querySelector("#gamestart").innerText = "Restart";
    document.querySelector("#gamestart").addEventListener("click", restart);
    console.log(count, randombutton);
  } else {
    clearInterval(timerstop);
    //alert("Game has ended. Click refresh to play again!");
    console.log("count ended");
  }
}
// function to help the restart button
function restart() {
  window.location.reload();
  //document.body.reset();
}
function registerHit() {
  const attri = this.style.backgroundColor; //.getAttribute("text-indent");
  if (attri === "red") {
    successfulhit += 1;
    console.log("YESS HIT" + successfulhit + attri);
  } else {
    console.log("Not a hit");
  }
}
// create the list options for time
// const createTime = document.createElement("label");
// createTime.setAttribute("for","timer");
// createTime.innerText = "Choose time"
// const timeOptions = document.createElement("select");
// timeOptions.id = "timer";
// const time1 = document.createElement("option");
// time1.value = "60 seconds";
