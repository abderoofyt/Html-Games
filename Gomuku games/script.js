const boardSize = 19;
const connectLength = 6;
let board = [];
let currentPlayer = 'black';
let gameOver = false;

function createBoard() {
    const boardElement = document.getElementById('board');
    for (let row = 0; row < boardSize; row++) {
        board[row] = [];
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', onCellClick);
            boardElement.appendChild(cell);
            board[row][col] = null;
        }
    }
}

function onCellClick(event) {
    if (gameOver) return;
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    if (board[row][col] !== null) return;

    board[row][col] = currentPlayer;
    cell.classList.add(currentPlayer);
    if (checkWin(row, col, currentPlayer)) {
        document.getElementById('message').textContent = `${currentPlayer.toUpperCase()} wins!`;
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    }
}

function checkWin(row, col, player) {
    return checkDirection(row, col, 1, 0, player) ||  // Horizontal
           checkDirection(row, col, 0, 1, player) ||  // Vertical
           checkDirection(row, col, 1, 1, player) ||  // Diagonal \
           checkDirection(row, col, 1, -1, player);   // Diagonal /
}

function checkDirection(row, col, rowDir, colDir, player) {
    let count = 1;
    count += countStones(row, col, rowDir, colDir, player);
    count += countStones(row, col, -rowDir, -colDir, player);
    return count >= connectLength;
}

function countStones(row, col, rowDir, colDir, player) {
    let count = 0;
    for (let i = 1; i < connectLength; i++) {
        const newRow = row + i * rowDir;
        const newCol = col + i * colDir;
        if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize) break;
        if (board[newRow][newCol] === player) {
            count++;
        } else {
            break;
        }
    }
    return count;
}

createBoard();
