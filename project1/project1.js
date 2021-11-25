"use strict";

document.querySelector("#submitbutton").addEventListener("click", creategame);
creategridlist();

function creategame() {
  const playername = document.querySelector("#playername").value;
  if (playername !== "") {
    document.querySelector("#createplayerdiv").style.display = "none";
    selectionDifficulty();
    const displayname = document.createElement("h3");
    displayname.innerText = `Player name: ${playername}`;
    document.querySelector("#displayername").append(displayname);
    scoreboard();
    livesAvail();
    //creategridlist();
    //createhitbox(boxes);
    gamestart();
  } else {
    alert("Input a name please");
  }
}

function scoreboard() {
  const score = document.querySelector("#highscore");
  score.textContent = `Digletts boinked: ${successfulhit}`;
}

function livesAvail() {
  const lives = document.querySelector("#lives");
  lives.textContent = `Lives remaining: ${lifeCounter}`;
}
function countDownTimer() {
  let timeFunction = setInterval(() => {
    time -= 1;
    const timecount = document.querySelector("#timer");
    timecount.textContent = `Timer ${time}`;
  }, 1000);
  return timeFunction;
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
  document.querySelector("#initializationofgame").appendChild(gamestartbutton);
  document
    .querySelector("#gamestart")
    .addEventListener("click", timerstart, { once: true });
}
//let count = 0; setting this as the condition to end game makes it difficult to increase the frequency of the moles as that would end the game too soon and a finite number of moles so I have switch to a fixed time based game.
let gameswitch = false;
let timerstop = null;
let timeIntervalforfunctions = "";
let successfulhit = 0;
let lifeCounter = 3;
let time = 20;

function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function selectionDifficulty() {
  const selectedOption = document.querySelector("#difficulty").selectedIndex;
  switch (selectedOption) {
    case 0:
      return (timeIntervalforfunctions = randomTime(1500, 2000));
    case 1:
      return (timeIntervalforfunctions = randomTime(800, 1000));
    case 2:
      return (timeIntervalforfunctions = randomTime(500, 800));
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
  setTimeout(countDownTimer, 2000);
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
    document.querySelector(`#${randombutton}`).classList.add("diglettAppear");
    // This is what changes the button back to the orignal color
    function changecolorofbutton() {
      document
        .querySelector(`#${randombutton}`)
        .classList.remove("diglettAppear");
      console.log("IT WORKS. MIMICKING ONE MOLE");
    }
    setTimeout(changecolorofbutton, timeIntervalforfunctions);
    //document.querySelector(`#${randombutton}`).addEventListener("click",positivehit)
    //const hitmole = document.querySelector(".divbuttoncontainer");
    const hitmole = document.querySelectorAll(".buttons");
    console.log("This is hit mole" + hitmole);
    function addEventmole() {
      for (const each of hitmole) {
        each.addEventListener("mousedown", registerHit, { once: true });
      }
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
    document.querySelector("#timer").style.display = "none";
    alert("Game has ended. Click refresh to play again!");
    console.log("count ended");
  }
}
// function to help the restart button
function restart() {
  window.location.reload();
  //document.body.reset();
}
function registerHit() {
  const attri = this.className; //.getAttribute("text-indent");
  console.log(attri);
  if (attri === "buttons diglettAppear") {
    successfulhit += 1;
    scoreboard();
    console.log("YESS HIT" + successfulhit + attri);
  } else {
    lifeCounter -= 1;
    livesAvail();
    if (lifeCounter === 0) {
      clearInterval(timerstop);
      alert("You ran out of lives!");
      window.location.reload();
    }
    //console.log("Not a hit", lifeCounter);
  }
}
