const boardSize = 3;
let currentPlayer = 'X';
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(null));
let scores = { X: 0, O: 0 };
const boardElement = document.getElementById('game-board');
const statusElement = document.getElementById('status');
const scoreElement = document.getElementById('score');
const resetButton = document.getElementById('reset-button');

function createBoard() {
  boardElement.innerHTML = '';
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', () => handleClick(row, col));
      boardElement.appendChild(cell);
    }
  }
}

function handleClick(row, col) {
  if (board[row][col] || checkWinner()) return;

  board[row][col] = currentPlayer;
  updateBoard();
  if (checkWinner()) {
    statusElement.innerText = `Player ${currentPlayer} Wins!`;
    scores[currentPlayer]++;
    updateScore();
  } else if (board.flat().every(cell => cell)) {
    statusElement.innerText = 'It\'s a Draw!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.innerText = `Player ${currentPlayer}'s Turn`;
  }
}

function updateBoard() {
  const cells = boardElement.querySelectorAll('.cell');
  cells.forEach(cell => {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    cell.innerText = board[row][col] || '';
    cell.className = `cell ${board[row][col]?.toLowerCase() || ''}`;
  });
}

function checkWinner() {
  const lines = [
                // Rows
                ...board,
                // Columns
                ...board[0].map((_, col) => board.map(row => row[col])),
                // Diagonals
                [0, 1, 2].map(i => board[i][i]),
                [0, 1, 2].map(i => board[i][2 - i])
            ];

  for (const line of lines) {
    if (line.every(cell => cell && cell === line[0])) {
      return true;
    }
  }
  return false;
}

function updateScore() {
  scoreElement.innerText = `Score - X: ${scores.X} | O: ${scores.O}`;
}

function resetGame() {
  currentPlayer = 'X';
  board = Array(boardSize).fill().map(() => Array(boardSize).fill(null));
  statusElement.innerText = `Player ${currentPlayer}'s Turn`;
  updateBoard();
}

createBoard();
updateScore();

resetButton.addEventListener('click', resetGame);
