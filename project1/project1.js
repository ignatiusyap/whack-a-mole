"use strict";

document.querySelector("#submitbutton").addEventListener("click", creategame);
creategridlist();

function creategame() {
  const playername = document.querySelector("#playername").value;
  if (playername !== "") {
    document.querySelector("#createplayerdiv").style.display = "none";
    const displayname = document.createElement("h3");
    displayname.innerText = `Player name: ${playername}`;
    document.querySelector("#displayername").append(displayname);
    selectionDifficulty();
    //creategridlist();
    //createhitbox(boxes);
    gamestart();
  } else {
    alert("Input a name please");
  }
}

let boxes = 6;
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
  createList.setAttribute("for", "difficulty");
  createList.innerText = "Choose difficulty";
  const listOptions = document.createElement("select");
  listOptions.id = "difficulty";
  const grid3 = document.createElement("option");
  grid3.value = "Easy";
  grid3.innerText = "Easy";
  const grid4 = document.createElement("option");
  grid4.value = "Medium";
  grid4.innerText = "Medium";
  const grid5 = document.createElement("option");
  grid5.value = "Hard";
  grid5.innerText = "Hard";
  const grid6 = document.createElement("option");
  grid6.value = "Are you serious? -.-";
  grid6.innerText = "Are you serious? -.-";
  document.querySelector("#gameoptions").appendChild(createList);
  document.querySelector("#gameoptions").appendChild(listOptions);
  listOptions.append(grid3, grid4, grid5, grid6);
}
// After player set the options, the options are removed from the panel.
//
//document.querySelector("#gamestart").addEventListener("click", timerstart);
function gamestart() {
  const gamestartbutton = document.createElement("button");
  gamestartbutton.id = "gamestart";
  gamestartbutton.innerText = "Start Game";
  document.querySelector("#displayername").appendChild(gamestartbutton);
  document
    .querySelector("#gamestart")
    .addEventListener("click", timerstart, { once: true });
}
//let count = 0; setting this as the condition to end game makes it difficult to increase the frequency of the moles as that would end the game too soon and a finite number of moles so I have switch to a fixed time based game.
let gameswitch = false;
let timerstop = null;
let timeIntervalforfunctions = "";
let successfulhit = 0;

function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function selectionDifficulty() {
  const selectedOption = document.querySelector("#difficulty").selectedIndex;
  switch (selectedOption) {
    case 0:
      return (timeIntervalforfunctions = randomTime(1500, 2000));
    case 1:
      return (timeIntervalforfunctions = randomTime(1000, 1500));
    case 2:
      return (timeIntervalforfunctions = randomTime(800, 1000));
    case 3:
      return (timeIntervalforfunctions = randomTime(50, 400));
  }
}

//global variable needed to be declared for the timerstop variable to be overridden with timerstart function. Random mol is initialised using the set interval here.
function timerstart() {
  createhitbox(boxes);
  console.log(gameswitch);
  timerstop = setInterval(randomMole, timeIntervalforfunctions);
  setTimeout(() => (gameswitch = true), 22000);

  // WHY MUST I PUT TIMEOUT IN THIS FUNCTION AND NOT CALL IT IN RANDOM MOLE????
  // let timerstop = setInterval(() => {
  //   randomMole;
  // }, 2000);
  // return timerstop; does not work
  //wrapper function works as this variable is defined. if not it will go to the default window object.
}
const tracker = [];
function randomMole() {
  //count += 1;

  if (gameswitch === false) {
    //to hide the game options
    document.querySelector("#gameoptions").style.display = "none";
    // This is the mole
    const randomIndex = Math.floor(Math.random() * boxes);
    const randombutton = `button${tracker[tracker.length - 1]}`;
    tracker.push(randomIndex);
    while (tracker[tracker.length - 1] === tracker[tracker.length - 2]) {
      const randomIndex = Math.floor(Math.random() * boxes);
      const randombutton = `button${randomIndex}`;
      tracker.push(randomIndex);
      //console.log("Ooooooooo", tracker);
    }
    // if loop used here the loop will end prematurely and run the same number
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
    //console.log(gameswitch, randombutton, tracker);
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
