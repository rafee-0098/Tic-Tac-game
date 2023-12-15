const gameBoard = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restart-button');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;
  checkWin();
  checkDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      gameActive = false;
      statusMessage.innerText = `${currentPlayer} wins!`;
    }
  }
}

function checkDraw() {
  if (!gameState.includes('') && gameActive) {
    gameActive = false;
    statusMessage.innerText = 'It\'s a draw!';
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusMessage.innerText = '';
  cells.forEach(cell => {
    cell.innerText = '';
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
