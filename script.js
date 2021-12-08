let gameState = true;
// let winner = "";
let gameArray = ["", "", "", "", "", "", "", "", ""];

function PlayerFactory(name, symbol) {
  return {
    name,
    symbol,
    score: 0,
  };
}
const scorePlayerOne = document.querySelector(".scoreboard--player1");
const scorePlayerTwo = document.querySelector(".scoreboard--player2");
const tiles = document.querySelectorAll(".tile");
const message = document.querySelector(".message");
const resetBtn = document.querySelector(".resetBtn");
const playerOne = PlayerFactory("Player One", "X");
const playerTwo = PlayerFactory("Player Two", "O");
let currentPlayer = playerOne;

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

resetBtn.addEventListener("click", newGame);

function declareWinner() {}

function newGame() {
  gameArray = ["", "", "", "", "", "", "", "", ""];
  tiles.forEach((tile) => {
    tile.textContent = "";
  });
  gameState = true;
  startGame();
  currentPlayer = playerOne;
  message.textContent = `${currentPlayer.name}'s turn`;
}

function startGame() {
  tiles.forEach((tile) => {
    addEventListener("click", (e) => {
      if (gameState === true) {
        let id = e.target.id;
        if (gameArray[id] === "") {
          gameArray[id] = currentPlayer.symbol;
          e.target.textContent = currentPlayer.symbol;
          checkForWinner();
          if (gameState === true) {
            changePlayer();
          }
        }
      }
    });
  });
}

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
      let winner = currentPlayer.name;
      message.textContent = `${winner} WINS!!`;
      currentPlayer.score += 1;
      scorePlayerOne.textContent = `Player 1 score: ${playerOne.score}`;
      scorePlayerTwo.textContent = `Player 2 score: ${playerTwo.score}`;
      gameState = false;
    }
    if (gameArray.includes("") === false) {
      message.textContent = `it's a tie!`;
      gameState = false;
    }
  }
}

startGame();
