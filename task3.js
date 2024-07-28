document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');
    const mode1vs1Button = document.getElementById('mode-1vs1');
    const modeVsComputerButton = document.getElementById('mode-vs-computer');
    let currentPlayer = 'x';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameMode = '1vs1'; // Default game mode

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return gameBoard.includes('') ? null : 'tie';
    }

    function computerMove() {
        const emptyCells = gameBoard.map((value, index) => value === '' ? index : null).filter(index => index !== null);
        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            gameBoard[randomIndex] = 'o';
            cells[randomIndex].classList.add('o');
            cells[randomIndex].textContent = 'o';
            const winner = checkWinner();
            if (winner) {
                message.textContent = winner === 'tie' ? "It's a tie!" : `${winner.toUpperCase()} wins!`;
            } else {
                currentPlayer = 'x';
            }
        }
    }

    function handleClick(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] || checkWinner()) return;

        gameBoard[index] = currentPlayer;
        event.target.classList.add(currentPlayer);
        event.target.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            message.textContent = winner === 'tie' ? "It's a tie!" : `${winner.toUpperCase()} wins!`;
        } else {
            if (gameMode === 'vs-computer' && currentPlayer === 'x') {
                currentPlayer = 'o';
                computerMove();
            } else {
                currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            }
        }
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.classList.remove('x', 'o');
            cell.textContent = '';
        });
        message.textContent = '';
        currentPlayer = 'x';
    }

    function setGameMode(mode) {
        gameMode = mode;
        resetGame();
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    resetButton.addEventListener('click', resetGame);
    mode1vs1Button.addEventListener('click', () => setGameMode('1vs1'));
    modeVsComputerButton.addEventListener('click', () => setGameMode('vs-computer'));
});
