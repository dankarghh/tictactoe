const tiles = document.querySelectorAll(".tile");
let gameArray = ["", "", "", "", "", "", "", "", ""];
let winner = "";
const message = document.querySelector(".message");
const resetBtn = document.querySelector(".resetBtn");
let gameState = true;

function PlayerFactory(name, symbol) {
  return {
    name,
    symbol,
  };
}
const playerOne = PlayerFactory("Player One", "X");
const playerTwo = PlayerFactory("Player Two", "O");
let currentPlayer = playerOne;

tiles.forEach((tile) => {
  addEventListener("click", (e) => {
    let id = e.target.id;
    if (gameArray[id] === "") {
      gameArray[id] = currentPlayer;
      e.target.textContent = currentPlayer.symbol;
      checkForWinner();
      if (gameState === true) {
        changePlayer();
      }
    }
  });
});

function changePlayer() {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo;
    message.textContent = `${currentPlayer.name}'s turn`;
  } else {
    currentPlayer = playerOne;
    message.textContent = `${currentPlayer.name}'s turn`;
  }
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [4, 5, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkForWinner() {
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameArray[winCondition[0]];
    let b = gameArray[winCondition[1]];
    let c = gameArray[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      winner = currentPlayer;
      break;
    }
  }
  if (winner !== "") {
    declareWinner();
    gameState = false;
    console.log(`${currentPlayer.name} is the winner`);
  }
}

resetBtn.addEventListener("click", newGame);

function delcareWinner() {}
function newGame() {
  gameArray = ["", "", "", "", "", "", "", "", ""];
  tiles.forEach((tile) => {
    tile.textContent = "";
  });
  currentPlayer = playerOne;
  message.textContent = `${currentPlayer.name}'s turn'`;
}
