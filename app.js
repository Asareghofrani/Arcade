const cells = Array.from(document.querySelectorAll(".cell"));
const playerDisplay = document.querySelector(".display-player");
const resetButton = document.querySelector(".reset");
const announcer = document.querySelector(".announcer");
const select = document.querySelector(".numOfPlayers");
const value = select.options[select.selectedIndex].value;


let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "x";
let isGameActive = true;
let winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
cells.forEach(function (cell, index) {
  cell.addEventListener("click", function () {
  startGame(cell, index);
  });
});

function updateBoard(index) {
  board[index] = currentPlayer;
}

function validationChecking() {
  let validation = false;
  for (let i = 0; i < 8; i++) {
    const winCondition = winCombinations[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      validation = true;
      break;
    }
  }
  if (validation) {
      if (currentPlayer === "x") {
      announcer.innerHTML = 'Player <span class="playerx"> X</span> won!';
    } 
    else {
      announcer.innerHTML = 'Player <span class="playero">O</span> won!';
    }
    announcer.classList.remove("hide");
    isGameActive = false;
    return;
  }
  if (!board.includes("")) {
    announcer.innerHTML = `Tie`;
    announcer.classList.remove("hide");
  }
}
function isActionValid(cell) {
  if (cell.innerText === "x" || cell.innerText === "o") {
    return false;
  }
  return true;
}

function changeTurn() {
  playerDisplay.classList.remove(`player${currentPlayer}`);
  if (currentPlayer === "x"){
    currentPlayer="o";
  }
    else {
      currentPlayer="x";
    }
  playerDisplay.innerText = currentPlayer;
  playerDisplay.classList.add(`player${currentPlayer}`);
}

function startGame(cell, index) {
  if (isActionValid(cell) && isGameActive) {
    cell.innerText = currentPlayer;
    cell.classList.add("player${currentPlayer}");
    updateBoard(index);
    validationChecking();
    changeTurn();
    if ( select.options[select.selectedIndex].value ==="onePlayer" && currentPlayer==="o"){
      computerPlay();
    }
  }
}

function emptyBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  announcer.classList.add("hide");
  if ( currentPlayer === "o") {
    changeTurn();
  }
  cells.forEach(function (cell) {
    cell.innerText = "";
    cell.classList.remove("playerx");
    cell.classList.remove("playero");
  });
}
resetButton.addEventListener("click", function () {
  emptyBoard();
} );
function findEmptyCells(){
  emptyCells =[];
  for (let i=0; i<9;i++) {
  if (board[i]===""){
    emptyCells.push(i);
}
  }
return emptyCells;
}
async function computerPlay(){
  await sleep(500);
  if (!smartPlayO() && !smartPlayX()){
  let mArray=findEmptyCells();
  let computerCell = Math.floor(Math.random() * mArray.length);
  computerCell = mArray[computerCell];
  startGame(cells[computerCell],computerCell);
}
}
function smartPlayX(){
  let ret = false;
    for (let j = 0; j < 8; j++) {
  const checkCondition = winCombinations[j];
  let arrayX=[];
  let arrayEmpty =[];
  for (let i=0;i<checkCondition.length ;i++){
  let item = board[checkCondition[i]];
  if (item ==="x"){
  arrayX.push(checkCondition[i]);
  }
  else if (item === ""){
  arrayEmpty.push(checkCondition[i]);
    }
    else{
      continue;
    }
    if (arrayX.length === 2  && arrayEmpty.length === 1){
     ret=true;
      startGame(cells[arrayEmpty[0]],arrayEmpty[0]);
return ret;
    }                            
    }
  }
return ret;
}
function smartPlayO(){
  let ret = false;
    for (let j = 0; j < 8; j++) {
  const checkCondition = winCombinations[j];
  let arrayO=[];
  let arrayEmpty =[];
  for (let i=0;i<checkCondition.length ;i++){
  let item = board[checkCondition[i]];
  if (item ==="o"){
  arrayO.push(checkCondition[i]);
  }
  else if (item === ""){
  arrayEmpty.push(checkCondition[i]);
    }
    else{
      continue;
    }
    if (arrayO.length === 2  && arrayEmpty.length === 1){
     ret=true;
      startGame(cells[arrayEmpty[0]],arrayEmpty[0]);
return ret;
    }                            
    }
  }
return ret;
}
