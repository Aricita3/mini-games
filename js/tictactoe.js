const board = document.querySelector('.tic-tac-toe-board');
const statusDisplay = document.getElementById('status');
let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.setAttribute('id', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.id);

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    checkResult();
}

function checkResult() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Jugador ${currentPlayer} ha ganado!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusDisplay.innerText = '¡Empate!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `Turno del jugador ${currentPlayer}`;
}

function reiniciarJuego() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.innerText = `Turno del jugador ${currentPlayer}`;
    
    const cells = board.querySelectorAll('button');
    cells.forEach(cell => {
        cell.innerText = '';
    });
}

createBoard();
statusDisplay.innerText = `Turno del jugador ${currentPlayer}`;

