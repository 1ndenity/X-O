const board = document.querySelector("#board");

let winningCombo = [0, 0, 0,]


let gameBoard = [
    "", "", "",
    "", "", "",
    "", "", ""
];
let = currentPlayer = "X";


function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);    
  }
}

function handleCellClick(event) {
    const turmanager = document.querySelector("#message");
  console.log("Cell clicked:", event.target.dataset.index);
  event.target.textContent = currentPlayer;
  gameBoard[event.target.dataset.index] = currentPlayer;
  console.log(checkWin);
  if (checkWin()) {
    turmanager.textContent = `${currentPlayer} wygrał!`;
    console.log("Wygrał: ", currentPlayer);
    drawWinningLine();
    return;
  }
  if(currentPlayer === "X") {
    currentPlayer = "O";
    turmanager.textContent = "Tura: O";
  }
  else {
    currentPlayer = "X";
    turmanager.textContent = "Tura: X";

}
    event.target.removeEventListener("click", handleCellClick);
}

createBoard();

function checkWin(){
    const winconditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const condition of winconditions) {
        const [a, b, c] = condition;
        if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
        ) {
        winningCombo = condition;
        return true;
     }
    }
    return false;
}

const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", resetGame);
function resetGame() {
    gameBoard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    currentPlayer = "X";
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.addEventListener("click", handleCellClick);
    });
    document.querySelector("#message").textContent = "Tura: X";
}
resetGame();

function drawWinningLine() {
    const line = document.createElement("div");
    line.classList.add("line");
    board.appendChild(line);

    const start = winningCombo[0];
    const end = winningCombo[2];

    console.log(winningCombo[0], winningCombo[1], winningCombo[2]);
    console.log(winningCombo);

    if (start === 0 && end === 2) {
        line.style.top = "50px";
        line.style.left = "0";
    } else if (start === 3 && end === 5) {
        line.style.top = "155px";
        line.style.left = "0";
    } else if (start === 6 && end === 8) {
    line.style.top = "260px";
    line.style.left = "0";
    } else if (start === 0 && end === 6) {
        line.style.width = "322px";
        line.style.top = "0";
        line.style.left = "55px";
        line.style.transform = "rotate(90deg)";
    }  else if (start === 2 && end === 8) {
        line.style.width = "322px";
        line.style.top = "0";
        line.style.left = "265px";
        line.style.transform = "rotate(90deg)";
    } else if (start === 0 && end === 8) {
        line.style.width = "444px";
        line.style.top = "318px";
        line.style.left = "0";
        line.style.transform = "rotate(45deg)";
    }
    else if (start === 2 && end === 6) {
        line.style.width = "444px";
        line.style.top = "318px";
        line.style.left = "0";
        line.style.transform = "rotate(-45deg)";
    } else {
        console.log("No winning line found.");
    }

}