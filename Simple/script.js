/**
 * Gra w kółko i krzyżyk
 * Prosta implementacja popularnej gry
 */

// Pobranie referencji do elementów DOM
const board = document.querySelector("#board");
const messageElement = document.querySelector("#message");
const resetBtn = document.querySelector("#resetBtn");

// Zmienne globalne
let winningCombo = []; // Przechowuje zwycięską kombinację
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Stan planszy
let currentPlayer = "X"; // Aktualny gracz
let gameActive = true; // Czy gra jest aktywna
let firstPlayer = "X"; // Gracz, który rozpoczyna grę

/**
 * Tworzy planszę do gry
 */
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

/**
 * Obsługuje kliknięcie w komórkę planszy
 * @param {Event} event - zdarzenie kliknięcia
 */
function handleCellClick(event) {
    const index = event.target.dataset.index;

    // Sprawdź czy pole jest puste i czy gra jest aktywna
    if (gameBoard[index] !== "" || !gameActive) {
        return;
    }

    // Aktualizacja planszy
    updateCell(event.target, index);

    // Sprawdzenie wyniku gry
    checkGameResult();
}

/**
 * Aktualizuje komórkę planszy
 * @param {HTMLElement} cell - element komórki
 * @param {number} index - indeks komórki
 */
function updateCell(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

/**
 * Sprawdza wynik gry (wygrana, remis)
 */
function checkGameResult() {
    if (checkWin()) {
        messageElement.textContent = `${currentPlayer} wygrał!`;
        gameActive = false;
        drawWinningLine();
        setTimeout(showGameOverMenu, 800);
        return;
    }

    if (checkDraw()) {
        messageElement.textContent = "Remis!";
        gameActive = false;
        setTimeout(showGameOverMenu, 800);
        return;
    }

    // Zmiana gracza
    changePlayer();
}

/**
 * Zmienia aktualnego gracza
 */
function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageElement.textContent = `Tura: ${currentPlayer}`;
}

/**
 * Sprawdza czy nastąpiła wygrana
 * @returns {boolean} - czy któryś z graczy wygrał
 */
function checkWin() {
    const winConditions = [
        [0, 1, 2], // poziome
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // pionowe
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // ukośne
        [2, 4, 6]
    ];

    for (const condition of winConditions) {
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

/**
 * Sprawdza czy nastąpił remis
 * @returns {boolean} - czy nastąpił remis
 */
function checkDraw() {
    return !gameBoard.includes("");
}

/**
 * Resetuje grę do stanu początkowego
 */
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = firstPlayer;
    gameActive = true;

    // Usunięcie linii wygranej, jeśli istnieje
    const line = document.querySelector(".line");
    if (line) {
        line.remove();
    }

    // Usunięcie menu końca gry, jeśli istnieje
    const menuOverlay = document.querySelector(".game-over-overlay");
    if (menuOverlay) {
        menuOverlay.remove();
    }

    // Reset komórek planszy
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = "";
    });

    messageElement.textContent = `Tura: ${currentPlayer}`;
}

/**
 * Pokazuje menu po zakończeniu gry
 */
function showGameOverMenu() {
    // Tworzenie elementu overlay
    const overlay = document.createElement("div");
    overlay.classList.add("game-over-overlay");

    // Tworzenie kontenera menu
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("game-over-menu");

    // Tytuł menu
    const title = document.createElement("h2");
    title.textContent = checkWin() ? `${currentPlayer} wygrał!` : "Remis!";
    menuContainer.appendChild(title);

    // Instrukcja
    const instruction = document.createElement("p");
    instruction.textContent = "Wybierz, kto zaczyna następną grę:";
    menuContainer.appendChild(instruction);

    // Przyciski wyboru
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("button-container");

    const xButton = document.createElement("button");
    xButton.textContent = "X";
    xButton.classList.add("player-choice-btn");
    if (firstPlayer === "X") xButton.classList.add("active");
    xButton.addEventListener("click", () => {
        firstPlayer = "X";
        document.querySelectorAll(".player-choice-btn").forEach(btn => btn.classList.remove("active"));
        xButton.classList.add("active");
    });

    const oButton = document.createElement("button");
    oButton.textContent = "O";
    oButton.classList.add("player-choice-btn");
    if (firstPlayer === "O") oButton.classList.add("active");
    oButton.addEventListener("click", () => {
        firstPlayer = "O";
        document.querySelectorAll(".player-choice-btn").forEach(btn => btn.classList.remove("active"));
        oButton.classList.add("active");
    });

    btnContainer.appendChild(xButton);
    btnContainer.appendChild(oButton);
    menuContainer.appendChild(btnContainer);

    // Przycisk rozpoczęcia nowej gry
    const newGameBtn = document.createElement("button");
    newGameBtn.textContent = "Nowa gra";
    newGameBtn.classList.add("new-game-btn");
    newGameBtn.addEventListener("click", resetGame);
    menuContainer.appendChild(newGameBtn);

    // Dodanie menu do overlay
    overlay.appendChild(menuContainer);

    // Dodanie overlay do ciała dokumentu
    document.body.appendChild(overlay);
}

/**
 * Rysuje linię przez zwycięską kombinację
 */
function drawWinningLine() {
    const line = document.createElement("div");
    line.classList.add("line");
    board.appendChild(line);

    const [start, _, end] = winningCombo;

    // Ustawienie stylu linii w zależności od zwycięskiej kombinacji
    if (start === 0 && end === 2) {
        // Górny poziomy
        line.style.top = "50px";
        line.style.left = "0";
    } else if (start === 3 && end === 5) {
        // Środkowy poziomy
        line.style.top = "155px";
        line.style.left = "0";
    } else if (start === 6 && end === 8) {
        // Dolny poziomy
        line.style.top = "260px";
        line.style.left = "0";
    } else if (start === 0 && end === 6) {
        // Lewy pionowy
        line.style.width = "322px";
        line.style.top = "0";
        line.style.left = "55px";
        line.style.transform = "rotate(90deg)";
    } else if (start === 1 && end === 7) {
        // Środkowy pionowy
        line.style.width = "322px";
        line.style.top = "0";
        line.style.left = "160px";
        line.style.transform = "rotate(90deg)";
    } else if (start === 2 && end === 8) {
        // Prawy pionowy
        line.style.width = "322px";
        line.style.top = "0";
        line.style.left = "265px";
        line.style.transform = "rotate(90deg)";
    } else if (start === 0 && end === 8) {
        // Przekątna \
        line.style.width = "432px";
        line.style.top = "0px";
        line.style.left = "3px";
        line.style.transform = "rotate(45deg)";
    } else if (start === 2 && end === 6) {
        // Przekątna /
        line.style.width = "444px";
        line.style.top = "155px";
        line.style.left = "-65px";
        line.style.transform = "rotate(-45deg)";
    }
}

// Inicjalizacja gry
createBoard();
resetBtn.addEventListener("click", resetGame);