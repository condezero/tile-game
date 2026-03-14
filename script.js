const size = 5;
let currentNum = 1;
let lastPos = null;
let board = Array(size * size).fill(null);
let timer = null;
let startTime = null;

const gridElement = document.getElementById('grid');
const statusElement = document.getElementById('status');

function createGrid() {
    gridElement.innerHTML = '';
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.onclick = () => handleMove(cell);
        gridElement.appendChild(cell);
    }
    updateBoard();
}

function handleMove(cell) {
    const index = parseInt(cell.dataset.index);
    if (board[index] !== null) return;

    if (currentNum === 1 || isValidMove(index)) {
        cell.textContent = currentNum;
        if (currentNum === 1) startGame();
        board[index] = currentNum;
        lastPos = index;
        currentNum++;
        updateBoard();
        checkGameOver();
    } else {
        cell.classList.add('wrong');
        cell.addEventListener('animationend', () => cell.classList.remove('wrong'), {once: true});
    }
}

function isValidMove(index) {
    if (lastPos === null) return true;
    
    const r1 = Math.floor(lastPos / size), c1 = lastPos % size;
    const r2 = Math.floor(index / size), c2 = index % size;
    
    const rowDiff = Math.abs(r1 - r2);
    const colDiff = Math.abs(c1 - c2);

    // Regla: 3 casillas (salto de 2) en H/V, o 2 casillas (salto de 1) en diagonal
    const horizontalVertical = (rowDiff === 3 && colDiff === 0) || (rowDiff === 0 && colDiff === 3);
    const diagonal = (rowDiff === 2 && colDiff === 2);

    return horizontalVertical || diagonal;
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, i) => {
        cell.textContent = board[i] || '';
        cell.className = 'cell';
        if (board[i]) cell.classList.add('marked');
        if (i === lastPos) cell.classList.add('last');
    });
    statusElement.textContent = currentNum > 25 ? "Completed!" : `Next move: ${currentNum}`;
    if (currentNum > 25 && timer) {
        clearInterval(timer);
        timer = null;
        showPopup(`You Won! ${document.getElementById('timer').textContent}`, 'green');
    }
}

function checkGameOver() {
    if (currentNum > 25) return;
    const hasMoves = board.some((val, i) => val === null && isValidMove(i));
    if (!hasMoves && currentNum > 1) {
        statusElement.textContent = `Blocked on move ${currentNum - 1}! Try again.`;
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        showPopup('You Lost!', 'red');
    }
}

function resetGame() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    startTime = null;
    board = Array(size * size).fill(null);
    currentNum = 1;
    lastPos = null;
    document.getElementById('timer').textContent = 'Time: 00:00:00';
    document.getElementById('popup').style.display = 'none';
    createGrid();
}

createGrid();

document.getElementById('resetBtn').addEventListener('click', resetGame);

function startGame() {
    if (timer) return;
    startTime = Date.now();
    timer = setInterval(updateTimer, 100);
}

function updateTimer() {
    const elapsed = Date.now() - startTime;
    const min = Math.floor(elapsed / 60000);
    const sec = Math.floor((elapsed % 60000) / 1000);
    const ms = Math.floor((elapsed % 1000) / 10);
    document.getElementById('timer').textContent = `Time: ${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}:${ms.toString().padStart(2,'0')}`;
}

function showPopup(message, color) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.style.color = color;
    popup.style.display = 'block';
}