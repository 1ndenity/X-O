document.addEventListener('DOMContentLoaded', () => {
    // ======= ZMIENNE GRY =======

    // Aktualny gracz (x lub o)
    let currentPlayer = 'x';

    // Plansza gry (pusta tablica 3x3)
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    // Czy gra jest aktywna
    let gameActive = false;

    // Wybrana strona gracza (x lub o)
    let playerSide = 'x';

    // Tryb gry (true = gra z AI, false = gra z drugim graczem)
    let aiMode = true;

    // Punktacja
    let scores = { x: 0, o: 0 };

    // Aktualny język (domyślnie polski)
    let currentLanguage = 'pl';

    // Tłumaczenia (wbudowane zamiast ładowania z pliku)
    const translations = {
        "pl": {
            "title": "Kółko i Krzyżyk",
            "language": "Język",
            "accent": "Kolor",
            "player-x": "Gracz X",
            "player-o": "Gracz O",
            "status-your-turn": "Twoja kolej",
            "status-ai-thinking": "AI myśli...",
            "status-player-turn": "Kolej gracza {player}",
            "welcome": "Witaj w grze!",
            "choose-mode": "Wybierz tryb gry",
            "play-vs-ai": "Graj z AI",
            "play-vs-player": "Graj z przyjacielem",
            "choose-player": "Wybierz stronę",
            "play-as-x": "Graj jako X",
            "play-as-o": "Graj jako O",
            "start-game": "Rozpocznij grę",
            "game-result": "Wynik gry",
            "win-message": "{player} wygrywa!",
            "draw-message": "Remis!",
            "new-game": "Nowa gra",
            "close": "Zamknij",
            "play": "Graj"
        },
        "ru": {
            "title": "Крестики-нолики",
            "language": "Язык",
            "accent": "Цвет",
            "player-x": "Игрок X",
            "player-o": "Игрок O",
            "status-your-turn": "Ваш ход",
            "status-ai-thinking": "ИИ думает...",
            "status-player-turn": "Ход игрока {player}",
            "welcome": "Добро пожаловать!",
            "choose-mode": "Выберите режим игры",
            "play-vs-ai": "Играть с ИИ",
            "play-vs-player": "Играть с другом",
            "choose-player": "Выберите сторону",
            "play-as-x": "Играть за X",
            "play-as-o": "Играть за O",
            "start-game": "Начать игру",
            "game-result": "Результат игры",
            "win-message": "{player} выигрывает!",
            "draw-message": "Ничья!",
            "new-game": "Новая игра",
            "close": "Закрыть",
            "play": "Играть"
        },
        "en": {
            "title": "Tic Tac Toe",
            "language": "Language",
            "accent": "Color",
            "player-x": "Player X",
            "player-o": "Player O",
            "status-your-turn": "Your turn",
            "status-ai-thinking": "AI is thinking...",
            "status-player-turn": "Player {player}'s turn",
            "welcome": "Welcome to the game!",
            "choose-mode": "Choose game mode",
            "play-vs-ai": "Play vs AI",
            "play-vs-player": "Play vs Friend",
            "choose-player": "Choose your side",
            "play-as-x": "Play as X",
            "play-as-o": "Play as O",
            "start-game": "Start Game",
            "game-result": "Game Result",
            "win-message": "{player} wins!",
            "draw-message": "It's a draw!",
            "new-game": "New Game",
            "close": "Close",
            "play": "Play"
        },
        "zh": {
            "title": "井字棋",
            "language": "语言",
            "accent": "颜色",
            "player-x": "玩家 X",
            "player-o": "玩家 O",
            "status-your-turn": "该您了",
            "status-ai-thinking": "AI思考中...",
            "status-player-turn": "玩家 {player} 回合",
            "welcome": "欢迎来到游戏!",
            "choose-mode": "选择游戏模式",
            "play-vs-ai": "对战人工智能",
            "play-vs-player": "对战朋友",
            "choose-player": "选择您的一方",
            "play-as-x": "选 X",
            "play-as-o": "选 O",
            "start-game": "开始游戏",
            "game-result": "游戏结果",
            "win-message": "{player} 获胜！",
            "draw-message": "平局！",
            "new-game": "新游戏",
            "close": "关闭",
            "play": "玩"
        }
    };

    // ======= WZORCE WYGRYWAJĄCYCH KOMBINACJI =======
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // poziome
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // pionowe
        [0, 4, 8],
        [2, 4, 6] // przekątne
    ];

    // ======= USTAWIENIA POCZĄTKOWE =======

    // Pobierz planszę gry
    const gameBoardElement = document.querySelector('.game-board');

    // Utwórz komórki planszy
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        gameBoardElement.appendChild(cell);
    }

    // SVG ikony dla X i O
    const xIcon = `<svg viewBox="0 0 24 24" width="100%" height="100%">
        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
    </svg>`;

    const oIcon = `<svg viewBox="0 0 24 24" width="100%" height="100%">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
    </svg>`;

    // Dodaj przycisk zamknięcia modalu
    // Dodanie przycisku zamknięcia do startowego modalu
    const startModal = document.getElementById('start-game-modal');
    if (startModal && !document.getElementById('close-start-modal')) {
        const closeButton = document.createElement('button');
        closeButton.id = 'close-start-modal';
        closeButton.className = 'close-modal-btn';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('aria-label', 'Zamknij');
        startModal.querySelector('.modal-content').prepend(closeButton);

        closeButton.addEventListener('click', () => {
            startModal.classList.remove('active');
            resetBoard();
            gameActive = true;
        });
    }

    // Dodanie przycisku zamknięcia do końcowego modalu
    const endModal = document.getElementById('game-over-modal');
    if (endModal && !document.getElementById('close-end-modal')) {
        const closeButton = document.createElement('button');
        closeButton.id = 'close-end-modal';
        closeButton.className = 'close-modal-btn';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('aria-label', 'Zamknij');
        endModal.querySelector('.modal-content').prepend(closeButton);

        closeButton.addEventListener('click', () => {
            endModal.classList.remove('active');
            resetBoard();
            gameActive = true;
        });
    }

    // Zmień tekst przycisku
    const startButton = document.getElementById('start-game-btn');
    if (startButton) {
        startButton.setAttribute('data-lang', 'play');
    }

    // ======= FUNKCJE GRY =======

    // Inicjalizacja gry - wywołaj bezpośrednio po załadowaniu DOM
    function initGame() {
        updateLanguage(currentLanguage);
        showStartGameModal();
    }

    // Obsługa kliknięcia komórki
    function handleCellClick(index) {
        // Sprawdź, czy można wykonać ruch
        if (gameBoard[index] !== '' || !gameActive) return;

        // Jeśli tryb AI i nie jest kolej gracza, wyjdź
        if (aiMode && currentPlayer !== playerSide) return;

        // Wykonaj ruch
        makeMove(index);

        // Jeśli gra z AI i gra jest aktywna, wykonaj ruch AI
        if (aiMode && gameActive && currentPlayer !== playerSide) {
            setTimeout(makeAIMove, 700);
        }
    }

    // Wykonanie ruchu
    function makeMove(index) {
        gameBoard[index] = currentPlayer;

        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.classList.add('filled', currentPlayer);
        cell.innerHTML = currentPlayer === 'x' ? xIcon : oIcon;

        // Animacja pojawienia się
        cell.style.transform = 'scale(0)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 10);

        // Sprawdź status gry
        checkGameStatus();

        // Zmień gracza jeśli gra wciąż trwa
        if (gameActive) {
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            updatePlayerTurn();
        }
    }

    // Ruch AI
    function makeAIMove() {
        // Sprawdź, czy AI może wygrać w następnym ruchu
        const winningMove = findWinningMove(currentPlayer);
        if (winningMove !== -1) {
            makeMove(winningMove);
            return;
        }

        // Sprawdź, czy trzeba zablokować wygraną przeciwnika
        const blockingMove = findWinningMove(playerSide);
        if (blockingMove !== -1) {
            makeMove(blockingMove);
            return;
        }

        // Jeśli środkowa komórka jest wolna, wybierz ją
        if (gameBoard[4] === '') {
            makeMove(4);
            return;
        }

        // Wybierz narożnik, jeśli jest dostępny
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => gameBoard[corner] === '');
        if (availableCorners.length > 0) {
            const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
            makeMove(randomCorner);
            return;
        }

        // W przeciwnym razie wybierz losową dostępną komórkę
        const availableMoves = gameBoard.map((cell, index) => cell === '' ? index : null).filter(cell => cell !== null);
        if (availableMoves.length > 0) {
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            makeMove(randomMove);
        }
    }

    // Znajdź wygrywający ruch dla danego gracza
    function findWinningMove(player) {
        // Sprawdź każdą wolną komórkę
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i] === '') {
                // Wykonaj tymczasowy ruch
                gameBoard[i] = player;

                // Sprawdź, czy ten ruch prowadzi do wygranej
                const winner = checkWinner();

                // Cofnij tymczasowy ruch
                gameBoard[i] = '';

                // Jeśli znaleziono wygrywający ruch, zwróć jego indeks
                if (winner === player) {
                    return i;
                }
            }
        }

        // Brak wygrywającego ruchu
        return -1;
    }

    // Sprawdź stan gry
    function checkGameStatus() {
        // Sprawdź wygraną
        const winner = checkWinner();

        if (winner) {
            gameActive = false;
            scores[winner]++;
            updateScores();

            // Pokaż winline
            showWinLine();

            // Pokaż komunikat po krótkim opóźnieniu
            setTimeout(() => {
                showGameOverModal(winner);
            }, 1500);

            return;
        }

        // Sprawdź remis
        if (!gameBoard.includes('')) {
            gameActive = false;

            // Pokaż komunikat po krótkim opóźnieniu
            setTimeout(() => {
                showGameOverModal(null);
            }, 1000);

            return;
        }
    }

    // Sprawdź czy jest zwycięzca
    function checkWinner() {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }
        return null;
    }

    // Pokaż linię wygranej
    function showWinLine() {
        // Znajduje zwycięski wzorzec
        for (let i = 0; i < winPatterns.length; i++) {
            const [a, b, c] = winPatterns[i];
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                // Tworzy element linii
                const winLine = document.createElement('div');
                winLine.classList.add('win-line');

                const cellSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cell-size'));
                const gap = 16; // Odstęp między komórkami (1rem = 16px)

                // Określa typ linii (pozioma, pionowa, ukośna)
                if (i < 3) { // Pozioma linia
                    const row = Math.floor(a / 3);
                    winLine.classList.add('horizontal');
                    winLine.style.top = `calc(${row} * (var(--cell-size) + 1rem) + var(--cell-size) / 2 - 3px)`;
                } else if (i < 6) { // Pionowa linia
                    const col = a % 3;
                    winLine.classList.add('vertical');
                    winLine.style.left = `calc(${col} * (var(--cell-size) + 1rem) + var(--cell-size) / 2 - 3px)`;
                } else { // Ukośna linia
                    winLine.classList.add('diagonal');

                    const boardSize = 3 * cellSize + 2 * gap; // Całkowity rozmiar planszy

                    if (i === 6) { // Linia od lewego górnego do prawego dolnego
                        winLine.classList.add('top-left');
                        // Centrowanie linii ukośnej
                        winLine.style.width = `${Math.sqrt(2) * boardSize}px`;
                        winLine.style.top = `calc(50% - ${Math.sqrt(2) * boardSize / 2}px)`;
                        winLine.style.left = `calc(50% - ${Math.sqrt(2) * boardSize / 2}px)`;
                    } else { // Linia od prawego górnego do lewego dolnego
                        winLine.classList.add('top-right');
                        // Centrowanie linii ukośnej
                        winLine.style.width = `${Math.sqrt(2) * boardSize}px`;
                        winLine.style.top = `calc(50% - ${Math.sqrt(2) * boardSize / 2}px)`;
                        winLine.style.left = `calc(50% - ${Math.sqrt(2) * boardSize / 2}px)`;
                    }
                }

                // Dodaje linię do planszy
                gameBoardElement.appendChild(winLine);

                // Animuje linię z opóźnieniem
                setTimeout(() => {
                    winLine.style.opacity = '1';
                }, 200);

                break;
            }
        }
    }

    // Aktualizuj informację o kolei gracza
    function updatePlayerTurn() {
        const playerX = document.getElementById('player-x');
        const playerO = document.getElementById('player-o');
        const gameStatus = document.getElementById('game-status');

        playerX.classList.toggle('active', currentPlayer === 'x');
        playerO.classList.toggle('active', currentPlayer === 'o');

        // Aktualizuj text statusu
        if (aiMode) {
            if (currentPlayer === playerSide) {
                gameStatus.textContent = getTranslation('status-your-turn');
            } else {
                gameStatus.textContent = getTranslation('status-ai-thinking');
            }
        } else {
            gameStatus.textContent = getTranslation('status-player-turn')
                .replace('{player}', currentPlayer.toUpperCase());
        }
    }

    // Aktualizuj wynik
    function updateScores() {
        document.getElementById('score-x').textContent = scores.x;
        document.getElementById('score-o').textContent = scores.o;
    }

    // Resetuj planszę
    function resetBoard() {
        // Wyczyść zmienne stanu
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'x';

        // Wyczyść planszę
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.className = 'cell';
            cell.innerHTML = '';
            cell.style.transform = '';
        });

        // Usuń linię wygranej
        const winLine = document.querySelector('.win-line');
        if (winLine) {
            winLine.remove();
        }

        // Aktualizuj informację o kolei gracza
        updatePlayerTurn();

        // Jeśli gra z AI i AI zaczyna, wykonaj ruch AI
        if (aiMode && playerSide !== currentPlayer) {
            setTimeout(makeAIMove, 700);
        }
    }

    // Pokaż modal początku gry
    function showStartGameModal() {
        const modal = document.getElementById('start-game-modal');
        if (!modal) {
            console.error('Nie znaleziono elementu modalu!');
            return;
        }

        // Zresetuj wybory
        document.querySelectorAll('.mode-button, .player-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Aktywuj domyślne przyciski
        document.getElementById('mode-ai').classList.add('active');
        document.getElementById('choose-x').classList.add('active');

        // Ustaw domyślne wartości
        aiMode = true;
        playerSide = 'x';

        // Pokaż modal
        modal.classList.add('active');
    }

    // Pokaż modal końca gry
    function showGameOverModal(winner) {
        const modal = document.getElementById('game-over-modal');
        const gameMessage = document.getElementById('game-message');
        const gameResult = document.getElementById('game-result');

        if (winner) {
            gameResult.textContent = getTranslation('game-result');
            gameMessage.textContent = getTranslation('win-message')
                .replace('{player}', winner.toUpperCase());
        } else {
            gameResult.textContent = getTranslation('game-result');
            gameMessage.textContent = getTranslation('draw-message');
        }

        // Zresetuj wybory
        document.querySelectorAll('#mode-ai-new, #mode-player-new, #choose-x-new, #choose-o-new').forEach(btn => {
            btn.classList.remove('active');
        });

        // Aktywuj domyślne przyciski
        document.getElementById(`mode-${aiMode ? 'ai' : 'player'}-new`).classList.add('active');
        document.getElementById(`choose-${playerSide}-new`).classList.add('active');

        modal.classList.add('active');
    }

    // ======= OBSŁUGA INTERFEJSU UŻYTKOWNIKA =======

    // Przełącznik motywów
    document.getElementById('theme-toggle').addEventListener('click', () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);

        // Zapisz preferencję w localStorage
        localStorage.setItem('theme', newTheme);
    });

    // Przełącznik języków
    document.getElementById('language-btn').addEventListener('click', () => {
        const dropdown = document.querySelector('.language-dropdown');
        dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    });

    // Wybór języka
    document.querySelectorAll('[data-lang-option]').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Zmiana języka na:', btn.getAttribute('data-lang-option'));

            // Aktualizuj język
            currentLanguage = btn.getAttribute('data-lang-option');
            updateLanguage(currentLanguage);

            // Aktualizuj aktywną opcję
            document.querySelectorAll('[data-lang-option]').forEach(opt => {
                opt.classList.remove('active');
            });
            btn.classList.add('active');

            // Zamknij dropdown
            document.querySelector('.language-dropdown').style.display = 'none';

            // Zapisz preferencję w localStorage
            localStorage.setItem('language', currentLanguage);
        });
    });

    // Przełącznik kolorów
    document.getElementById('accent-btn').addEventListener('click', () => {
        const dropdown = document.querySelector('.color-dropdown');
        dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    });

    // Wybór koloru akcentu
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.getAttribute('data-color');
            document.documentElement.setAttribute('data-accent', color);

            // Aktualizuj aktywną opcję
            document.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('active');
            });
            btn.classList.add('active');

            // Zamknij dropdown
            document.querySelector('.color-dropdown').style.display = 'none';

            // Zapisz preferencję w localStorage
            localStorage.setItem('accent-color', color);
        });
    });

    // Wybór trybu gry
    document.getElementById('mode-ai').addEventListener('click', () => {
        aiMode = true;
        document.getElementById('mode-ai').classList.add('active');
        document.getElementById('mode-player').classList.remove('active');
    });

    document.getElementById('mode-player').addEventListener('click', () => {
        aiMode = false;
        document.getElementById('mode-player').classList.add('active');
        document.getElementById('mode-ai').classList.remove('active');
    });

    // Wybór strony gracza (X lub O)
    document.getElementById('choose-x').addEventListener('click', () => {
        playerSide = 'x';
        document.getElementById('choose-x').classList.add('active');
        document.getElementById('choose-o').classList.remove('active');
    });

    document.getElementById('choose-o').addEventListener('click', () => {
        playerSide = 'o';
        document.getElementById('choose-o').classList.add('active');
        document.getElementById('choose-x').classList.remove('active');
    });

    // Wybór trybu gry (modal końca gry)
    document.getElementById('mode-ai-new').addEventListener('click', () => {
        aiMode = true;
        document.getElementById('mode-ai-new').classList.add('active');
        document.getElementById('mode-player-new').classList.remove('active');
    });

    document.getElementById('mode-player-new').addEventListener('click', () => {
        aiMode = false;
        document.getElementById('mode-player-new').classList.add('active');
        document.getElementById('mode-ai-new').classList.remove('active');
    });

    // Wybór strony gracza (modal końca gry)
    document.getElementById('choose-x-new').addEventListener('click', () => {
        playerSide = 'x';
        document.getElementById('choose-x-new').classList.add('active');
        document.getElementById('choose-o-new').classList.remove('active');
    });

    document.getElementById('choose-o-new').addEventListener('click', () => {
        playerSide = 'o';
        document.getElementById('choose-o-new').classList.add('active');
        document.getElementById('choose-x-new').classList.remove('active');
    });

    // Rozpocznij grę (przycisk)
    document.getElementById('start-game-btn').addEventListener('click', () => {
        document.getElementById('start-game-modal').classList.remove('active');
        resetBoard();
        gameActive = true;
    });

    // Nowa gra (przycisk)
    document.getElementById('new-game-btn').addEventListener('click', () => {
        document.getElementById('game-over-modal').classList.remove('active');
        resetBoard();
        gameActive = true;
    });

    // ======= FUNKCJE LOKALIZACJI =======

    // Aktualizuj język interfejsu
    function updateLanguage(lang) {
        if (!translations[lang]) {
            console.error('Nie znaleziono tłumaczeń dla języka:', lang);
            return;
        }

        console.log('Aktualizacja języka na:', lang);

        // Aktualizuj wszystkie elementy z atrybutami data-lang
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Aktualizuj aktywny język w menu
        document.querySelectorAll('[data-lang-option]').forEach(btn => {
            if (btn.getAttribute('data-lang-option') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Aktualizuj status gry
        if (gameActive) {
            updatePlayerTurn();
        }
    }

    // Pobierz tłumaczenie
    function getTranslation(key, replacements = {}) {
        if (!translations[currentLanguage] || !translations[currentLanguage][key]) {
            console.warn('Brak tłumaczenia dla klucza:', key, 'w języku:', currentLanguage);
            return key;
        }

        let text = translations[currentLanguage][key];

        // Zastąp wartości
        Object.keys(replacements).forEach(placeholder => {
            text = text.replace(`{${placeholder}}`, replacements[placeholder]);
        });

        return text;
    }

    // ======= INICJALIZACJA =======

    // Pobierz zapisane preferencje
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    const savedAccentColor = localStorage.getItem('accent-color');

    // Zastosuj zapisane preferencje
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }

    if (savedAccentColor) {
        document.documentElement.setAttribute('data-accent', savedAccentColor);
        const colorOption = document.querySelector(`[data-color="${savedAccentColor}"]`);
        if (colorOption) {
            colorOption.classList.add('active');
        }
    } else {
        const defaultColorOption = document.querySelector('[data-color="blue"]');
        if (defaultColorOption) {
            defaultColorOption.classList.add('active');
        }
    }

    // Zamknij dropdowny po kliknięciu poza nimi
    document.addEventListener('click', (event) => {
        const languageSelector = document.querySelector('.language-selector');
        const colorPicker = document.querySelector('.color-picker');

        if (languageSelector && !languageSelector.contains(event.target)) {
            const dropdown = document.querySelector('.language-dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        }

        if (colorPicker && !colorPicker.contains(event.target)) {
            const dropdown = document.querySelector('.color-dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        }
    });

    // Inicjalizacja gry
    initGame();

    // Sprawdź czy modal się pojawił
    setTimeout(() => {
        const startModal = document.getElementById('start-game-modal');
        if (startModal && !startModal.classList.contains('active')) {
            console.log('Wymuszanie pokazania modalnego okna startowego');
            showStartGameModal();
        }
    }, 1000);
});