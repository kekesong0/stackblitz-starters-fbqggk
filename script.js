const map = document.querySelector('.map');
const message = document.querySelector('.message');
const restartBtn = document.querySelector('.restart-btn');
const hintBtn = document.getElementById('hint-btn');
const nameInput = document.getElementById('name-input');

const rows = 5;
const cols = 5;
const totalCells = rows * cols;
let treasureIndex;
let remainingAttempts = 10;

function initializeGame() {
  map.innerHTML = '';
  message.textContent = 'Click on any grid to find the treasure!';
  remainingAttempts = 10;

  // Randomly generate treasure location
  treasureIndex = Math.floor(Math.random() * totalCells);

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    map.appendChild(cell);

    // Add click event listener for each cell
    cell.addEventListener('click', () => handleCellClick(cell));
  }
}

function updateMessage(text) {
  message.textContent = text;
}

function handleCellClick(cell) {
  if (remainingAttempts <= 0) {
    updateMessage('Game over! Restart to try again.');
    return;
  }

  // Reduce one attempt chance
  remainingAttempts--;

  // Check if the treasure is found
  if (parseInt(cell.dataset.index) === treasureIndex) {
    updateMessage('🎉 You found the treasure!');
    cell.classList.add('treasure'); // Add treasure image to cell
    disableAllCells(); // Disable all grids
  } else {
    cell.style.backgroundColor = '#e9c46a';
    updateMessage(`No treasure here. ${remainingAttempts} attempts left.`);
  }

  if (remainingAttempts === 0) {
    updateMessage('Out of attempts! Restart to try again.');
    disableAllCells();
  }
}

// Disable click events for all grids
function disableAllCells() {
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.style.pointerEvents = 'none';
  });
}

// Provide Hints
hintBtn.addEventListener('click', () => {
  const hint = generateVagueHint();
  updateMessage(`Hint: ${hint}`);
});

function generateVagueHint() {
  const treasureRow = Math.floor(treasureIndex / cols);
  const treasureCol = treasureIndex % cols;

  const rowHint =
    treasureRow < rows / 2
      ? 'The treasure is in the top half of the grid.'
      : 'The treasure is in the bottom half of the grid.';

  const colHint =
    treasureCol < cols / 2
      ? 'The treasure is on the left side of the grid.'
      : 'The treasure is on the right side of the grid.';

  return `${rowHint} ${colHint}`;
}

// Add message based on name input
nameInput.addEventListener('input', (event) => {
  const name = event.target.value.trim();
  if (name.length > 0) {
    updateMessage(`Keep searching, ${name}!`);
  }
});

// Restart the game
restartBtn.addEventListener('click', initializeGame);

initializeGame();
