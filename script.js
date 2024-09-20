const cells = document.querySelectorAll('[data-cell]');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const popupRestartButton = document.getElementById('popupRestartButton');
let isXTurn = true;
let boardState = ["","","","","","","","","","","","","","","","","","","","","","","","",""];
const winPatterns = [
    [0, 1, 2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
    [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
    [0,6,12,18,24],[4,8,12,16,20]
];

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== "" || checkWinner()) return;

    boardState[cellIndex] = isXTurn ? "X" : "O";
    cell.textContent = isXTurn ? "X" : "O";
    cell.setAttribute('data-content', isXTurn ? "X" : "O"); // Set the text content for gradient
    cell.classList.add('clicked'); // Add clicked class to change background and text

    if (checkWinner()) {
        showPopup(`${isXTurn ? "X" : "O"} wins!`);
    } else if (boardState.every(cell => cell !== "")) {
        showPopup("It's a draw!");
    } else {
        isXTurn = !isXTurn;
    }
}

function checkWinner() {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return boardState[index] === (isXTurn ? "X" : "O");
        });
    });
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'flex'; // Show the popup
}


function restartGame() {
    isXTurn = true;
    boardState = ["","","","","","","","","","","","","","","","","","","","","","","","",""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.removeAttribute('data-content'); // Remove data-content attribute
        cell.classList.remove('clicked'); // Remove clicked class
    });
    popup.style.display = 'none'; // Hide the popup
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
popupRestartButton.addEventListener('click', restartGame);
