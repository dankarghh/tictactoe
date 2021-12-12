function PlayerFactory(name, symbol) {
  return {
    name,
    symbol,
    score: 0,
  };
}

//GAMEBOARD OBJECT

const gameBoard = (() => {
  let gameArray = ["", "", "", "", "", "", "", "", ""];
  const scorePlayerOne = document.querySelector(".scoreboard--player1");
  const scorePlayerTwo = document.querySelector(".scoreboard--player2");
  const tiles = document.querySelectorAll(".tile");
  const message = document.querySelector(".message");
  const resetBtn = document.querySelector(".resetBtn");

  return {
    gameArray,
    resetBtn,
    tiles,
    message,
    scorePlayerOne,
    scorePlayerTwo,
  };
})();

const gamePlay = (() => {
  const playerOne = PlayerFactory("Player One", "X");
  const playerTwo = PlayerFactory("Player Two", "O");
  let gameState = true;
  let currentPlayer = playerOne;
  gameBoard.resetBtn.addEventListener("click", newGame);

  function changePlayer() {
    if (currentPlayer === playerOne) {
      currentPlayer = playerTwo;
      gameBoard.message.textContent = `${currentPlayer.name}'s turn`;
    } else {
      currentPlayer = playerOne;
      gameBoard.message.textContent = `${currentPlayer.name}'s turn`;
    }
  }

  function startGame() {
    gameBoard.tiles.forEach((tile) => {
      addEventListener("click", (e) => {
        if (gameState === true) {
          let id = e.target.id;
          if (gameBoard.gameArray[id] === "") {
            gameBoard.gameArray[id] = currentPlayer.symbol;
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

  function newGame() {
    gameBoard.gameArray = ["", "", "", "", "", "", "", "", ""];
    gameBoard.tiles.forEach((tile) => {
      tile.textContent = "";
    });
    gameState = true;
    startGame();
    currentPlayer = playerOne;
    gameBoard.message.textContent = `${currentPlayer.name}'s turn`;
  }

  function checkForWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = gameBoard.gameArray[winCondition[0]];
      let b = gameBoard.gameArray[winCondition[1]];
      let c = gameBoard.gameArray[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        let winner = currentPlayer.name;
        gameBoard.message.textContent = `${winner} WINS!!`;
        currentPlayer.score += 1;
        gameBoard.scorePlayerOne.textContent = `Player 1 score: ${playerOne.score}`;
        gameBoard.scorePlayerTwo.textContent = `Player 2 score: ${playerTwo.score}`;
        gameState = false;
        {
          break;
        }
      }
      if (gameBoard.gameArray.includes("") === false) {
        gameBoard.message.textContent = `it's a tie!`;
        gameState = false;
      }
    }
  }

  return { checkForWinner, newGame, startGame };
})();

gamePlay.startGame();
