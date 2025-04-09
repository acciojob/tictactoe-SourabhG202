//your JS code here. If required.
let currentPlayer = 'X';
let board = Array(9).fill(null);
let player1 = '';
let player2 = '';
let gameActive = false;

document.getElementById('submit').addEventListener('click', () => {
  player1 = document.getElementById('player-1').value.trim();
  player2 = document.getElementById('player-2').value.trim();

  if (!player1 || !player2) {
    alert('Please enter both player names!');
    return;
  }

  document.querySelector('.form').style.display = 'none';
  document.querySelector('.game').style.display = 'block';
  document.querySelector('.message').textContent = `${player1}, you're up`;

  gameActive = true;
});

const cells = document.querySelectorAll('.cell');

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameActive || cell.textContent !== '') return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      const winner = currentPlayer === 'X' ? player1 : player2;
      document.querySelector('.message').textContent = `${winner}, congratulations you won!`;
      gameActive = false;
    } else if (board.every(cell => cell !== null)) {
      document.querySelector('.message').textContent = `It's a draw!`;
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      const nextPlayer = currentPlayer === 'X' ? player1 : player2;
      document.querySelector('.message').textContent = `${nextPlayer}, you're up`;
    }
  });
});

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  );
}
