// ============================================================
// AUDIO CONTEXT - Global Audio Management
// ============================================================
let audioContext = null;

function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// ============================================================
// SOUND EFFECT FUNCTIONS
// ============================================================

function playBeep(frequency = 600, duration = 0.1, volume = 0.3) {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
        console.log('Audio context error:', e);
    }
}

function playMoveSound() {
    // Beep sound for player move
    playBeep(600, 0.1, 0.3);
}

function playWinSound() {
    // Victory fanfare - three ascending notes
    setTimeout(() => playBeep(800, 0.3, 0.4), 0);
    setTimeout(() => playBeep(1000, 0.3, 0.4), 160);
    setTimeout(() => playBeep(1200, 0.3, 0.4), 320);
}

function playGameStartSound() {
    // Game start - two ascending notes
    setTimeout(() => playBeep(500, 0.2, 0.3), 0);
    setTimeout(() => playBeep(700, 0.2, 0.3), 160);
}

function playTieSound() {
    // Tie sound - two middle notes
    setTimeout(() => playBeep(650, 0.25, 0.3), 0);
    setTimeout(() => playBeep(750, 0.25, 0.3), 130);
}

// ============================================================
// CELEBRATION EFFECTS
// ============================================================

const celebrationContainer = document.querySelector('.celebration-container');
const confettiContainer = document.querySelector('.confetti-container');

function createBubble(x, y) {
    const bubbles = ['🎉', '✨', '🌟', '⭐', '🎊', '🎈', '💫', '🎆', '🎇', '✨', '🎁', '🏆'];
    const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = randomBubble;
    bubble.style.left = x + 'px';
    bubble.style.top = y + 'px';
    bubble.style.fontSize = (Math.random() * 30 + 20) + 'px';

    celebrationContainer.appendChild(bubble);

    setTimeout(() => bubble.remove(), 3000);
}

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#43e97b', '#38f9d7', '#4facfe', '#00f2fe', '#ffa502', '#ff6b9d'];

    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.width = (Math.random() * 8 + 5) + 'px';
        confetti.style.height = (Math.random() * 8 + 5) + 'px';

        confettiContainer.appendChild(confetti);

        setTimeout(() => confetti.remove(), 2500);
    }
}

function celebrateWin() {
    // Play win sound
    playWinSound();

    // Create bubbles from multiple positions
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createBubble(
                Math.random() * window.innerWidth,
                window.innerHeight / 2 + Math.random() * 200 - 100
            );
        }, i * 80);
    }

    // Create confetti bursts
    createConfetti();
    setTimeout(() => createConfetti(), 300);
    setTimeout(() => createConfetti(), 600);
}

function celebrateTie() {
    // Play tie sound
    playTieSound();

    // Create lighter celebration
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createBubble(
                Math.random() * window.innerWidth,
                window.innerHeight / 2
            );
        }, i * 100);
    }

    // Single confetti burst for tie
    createConfetti();
}

// ============================================================
// PLAYER FACTORY
// ============================================================

const Player = (name, symbol) => {
    const getSymbol = () => symbol;
    const getName = () => name;
    return { getSymbol, getName };
};

// ============================================================
// DOM ELEMENTS
// ============================================================

const gameCells = document.querySelectorAll('.gamecell');
const resetButton = document.querySelector('.reset-btn');
const namesDialog = document.querySelector('.names-dialog');
const namesDialogButton = namesDialog.querySelector('.start-btn');
const resultDialog = document.querySelector('.result-dialog');
const playAgainBtn = resultDialog.querySelector('.play-again-btn');
const player1NameDisplay = document.querySelector('.player-1 .player-name-display');
const player2NameDisplay = document.querySelector('.player-2 .player-name-display');
const playerCards = document.querySelectorAll('.player-card');

// ============================================================
// INITIALIZE GAME
// ============================================================

namesDialog.showModal();
playGameStartSound();

namesDialogButton.addEventListener('click', (event) => {
    const form = namesDialog.querySelector('form');
    const player1Name = form.querySelector('#name1');
    const player2Name = form.querySelector('#name2');

    if (player1Name.value.trim() && player2Name.value.trim()) {
        event.preventDefault();
        
        const player1 = Player(player1Name.value, 'X');
        const player2 = Player(player2Name.value, 'O');

        // Update player name displays
        player1NameDisplay.textContent = player1.getName();
        player2NameDisplay.textContent = player2.getName();

        namesDialog.close();
        gameInitialization(player1, player2);
    }
});

// ============================================================
// GAME INITIALIZATION
// ============================================================

function gameInitialization(player1, player2) {
    
    // GameBoard Module
    const gameBoard = (() => {
        let gameBoardArray = [null, null, null, null, null, null, null, null, null];

        const addToArray = (symbol, position) => {
            gameBoardArray[position] = symbol;
        };

        const clearArray = () => {
            gameBoardArray = [null, null, null, null, null, null, null, null, null];
        };

        const getGameBoardRows = () => {
            const copyGameArray = [...gameBoardArray];
            const res = [];
            for (let i = 0; i < gameBoardArray.length / 3; i++) {
                res.push(copyGameArray.splice(0, 3));
            }
            return res;
        };

        const getGameBoardColumns = () => {
            const copyGameArray = [...gameBoardArray];
            const res = [[], [], []];
            for (let i = 0; i < gameBoardArray.length; i++) {
                if (i % 3 === 0) {
                    res[0].push(copyGameArray[i]);
                } else if (i % 3 === 1) {
                    res[1].push(copyGameArray[i]);
                } else {
                    res[2].push(copyGameArray[i]);
                }
            }
            return res;
        };

        const getGameBoardDiagonals = () => {
            const copyGameArray = [...gameBoardArray];
            const diagonal1 = [copyGameArray[0], copyGameArray[4], copyGameArray[8]];
            const diagonal2 = [copyGameArray[2], copyGameArray[4], copyGameArray[6]];
            return [diagonal1, diagonal2];
        };

        const areItemsOfArrayEqual = (arr) => {
            const res = {
                areItemsEqual: null,
                winnerSymbol: ''
            };
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] !== arr[i + 1] || arr[i] === null) {
                    res.areItemsEqual = false;
                    return res;
                }
            }
            res.areItemsEqual = true;
            res.winnerSymbol = arr[0];
            return res;
        };

        const checkWinner = () => {
            const gameRows = getGameBoardRows();
            const gameColumns = getGameBoardColumns();
            const gameDiagonals = getGameBoardDiagonals();
            const gameCombinations = [...gameRows, ...gameColumns, ...gameDiagonals];

            const result = {
                hasSomeoneWon: false,
                tie: false,
                winnerSymbol: ''
            };

            for (let i = 0; i < gameCombinations.length; i++) {
                const localRes = areItemsOfArrayEqual(gameCombinations[i]);
                if (localRes.areItemsEqual) {
                    result.hasSomeoneWon = true;
                    result.winnerSymbol = localRes.winnerSymbol;
                    return result;
                }
            }

            if (!gameBoardArray.includes(null)) {
                result.tie = true;
                return result;
            }

            return result;
        };

        return { addToArray, clearArray, checkWinner };
    })();

    // Display Controller Module
    const displayController = (() => {
        const playerTurnTitle = document.querySelector('.turn-message');
        const winnerDialogMessage = resultDialog.querySelector('.result-message');

        const addPlayerSymbol = (target, symbol) => {
            target.textContent = symbol;
            target.style.color = symbol === 'X' ? '#667eea' : '#f5576c';
            target.style.fontWeight = '800';
            target.style.fontSize = 'clamp(3rem, 20vw, 5rem)';
            target.classList.add('filled');
            
            // Add animation
            target.style.animation = 'none';
            setTimeout(() => {
                target.style.animation = 'popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }, 10);
        };

        const changePlayerTurnTitle = (message) => {
            playerTurnTitle.textContent = message;
            playerTurnTitle.style.animation = 'none';
            setTimeout(() => {
                playerTurnTitle.style.animation = 'fadeIn 0.4s ease-out';
            }, 10);
        };

        const showResultDialog = (message) => {
            winnerDialogMessage.textContent = message;
            resultDialog.showModal();
        };

        const cleanGameboard = () => {
            gameCells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('filled');
                cell.style.color = '';
                cell.style.animation = '';
            });
        };

        return { addPlayerSymbol, changePlayerTurnTitle, showResultDialog, cleanGameboard };
    })();

    // Game Logic Module
    const game = ((firstPlayer, secondPlayer) => {
        let currentPlayer = firstPlayer;
        let gameEnded = false;

        const updatePlayerHighlight = () => {
            playerCards.forEach(card => card.classList.remove('active'));
            if (currentPlayer === firstPlayer) {
                playerCards[0].classList.add('active');
            } else {
                playerCards[1].classList.add('active');
            }
        };

        displayController.changePlayerTurnTitle(`${currentPlayer.getName()}'s Turn`);
        updatePlayerHighlight();

        const makePlayerMove = (cell, player) => {
            // Check if cell is already filled
            if (cell.textContent.trim() !== '') return true;
            // Check if game has ended
            if (gameEnded) return true;

            displayController.addPlayerSymbol(cell, player.getSymbol());
            gameBoard.addToArray(player.getSymbol(), cell.dataset.position);
            playMoveSound(); // ALWAYS play sound for every move
            return false;
        };

        const parseSymbolToPlayer = (symbol, player1, player2) => {
            switch (symbol) {
                case player1.getSymbol():
                    return player1;
                case player2.getSymbol():
                    return player2;
                default:
                    throw new Error('Invalid symbol provided');
            }
        };

        const processGameResult = (player1, player2) => {
            const res = { gameEnded: false };
            const winnerObj = gameBoard.checkWinner();

            if (winnerObj.hasSomeoneWon) {
                const winnerPlayer = parseSymbolToPlayer(winnerObj.winnerSymbol, player1, player2);
                const message = `🎊 ${winnerPlayer.getName()} Wins! 🎊`;
                displayController.showResultDialog(message);
                celebrateWin(); // Plays sound + effects
                res.gameEnded = true;
            } else if (winnerObj.tie) {
                const message = `🤝 It's a Tie! 🤝`;
                displayController.showResultDialog(message);
                celebrateTie(); // Plays sound + effects
                res.gameEnded = true;
            }

            return res;
        };

        const changePlayerTurn = () => {
            currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
            const message = gameEnded ? 'Game Over' : `${currentPlayer.getName()}'s Turn`;
            displayController.changePlayerTurnTitle(message);
            updatePlayerHighlight();
        };

        const doPlayerTurn = function (e) {
            if (gameEnded) return;

            const cell = e.target.closest('.gamecell');
            if (!cell) return;

            const isCellTaken = makePlayerMove(cell, currentPlayer);
            if (isCellTaken) return;

            const result = processGameResult(firstPlayer, secondPlayer);
            gameEnded = result.gameEnded;
            
            if (!gameEnded) {
                changePlayerTurn();
            }
        };

        const cleanGame = function () {
            displayController.cleanGameboard();
            gameBoard.clearArray();
            currentPlayer = firstPlayer;
            gameEnded = false;
            displayController.changePlayerTurnTitle(`${currentPlayer.getName()}'s Turn`);
            updatePlayerHighlight();
            playerCards.forEach(card => card.classList.remove('active'));
            playerCards[0].classList.add('active');
            resultDialog.close();
        };

        return { doPlayerTurn, cleanGame };
    })(player1, player2);

    // Add Event Listeners
    resetButton.addEventListener('click', game.cleanGame);
    playAgainBtn.addEventListener('click', game.cleanGame);

    gameCells.forEach(cell => {
        cell.addEventListener('click', game.doPlayerTurn);
    });

    // Add animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}
