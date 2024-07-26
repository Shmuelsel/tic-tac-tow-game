const cellElements = document.querySelectorAll('[data-cell]');
const winnerModal = document.getElementById('winnerModal');
const winnerImage = document.getElementById('winnerImage');
const closeBtn = document.getElementsByClassName('close')[0];
const newGameBtn = document.getElementById('newGameBtn');
const restartGameBtn = document.getElementById('restartGameBtn');
const player1WinsElement = document.getElementById('player1Wins');
const player2WinsElement = document.getElementById('player2Wins');


// array with all the images of plyer 1
const player1Images = [
    'chavi&shmulik/chavi_1.jpg',
    'chavi&shmulik/chavi_2.jpg',
    'chavi&shmulik/chavi_3.jpg',
    'chavi&shmulik/chavi_4.jpg',
    'chavi&shmulik/chavi_5.jpg',
  ];

  // array with all the images of plyer 2
  const player2Images = [
    'chavi&shmulik/shmulik_1.jpg',
    'chavi&shmulik/shmulik_2.jpg',
    'chavi&shmulik/shmulik_3.jpg',
    'chavi&shmulik/shmulik_4.jpg',
    'chavi&shmulik/shmulik_5.jpg',
  ];

// image of the tow players together
const drawImage = 'chavi&shmulik/shmulik&chavi.jpg'; 

let currentPlayer = player1Images;
let board = Array(9).fill(null);

let player1Index = 0;
let player2Index = 0;

let player1Wins = 0;
let player2Wins = 0;

// the all combination of wining
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cellElements.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(cell, index), { once: true });
});

// function that checks if someone is winning or its a draw and
// if not both of them she swap trons together
function handleClick(cell, index) {
    placeMark(cell, index);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

// function that add image to the player selection
function placeMark(cell, index) {
    board[index] = currentPlayer === player1Images ? 'player1' : 'player2';
    const img = document.createElement('img');
    if (currentPlayer === player1Images) {
        img.src = player1Images[player1Index];
        player1Index = (player1Index + 1) % player1Images.length;
    } else {
        img.src = player2Images[player2Index];
        player2Index = (player2Index + 1) % player2Images.length;
    }
    cell.appendChild(img);
}

// function that swaps turns
function swapTurns() {
    currentPlayer = currentPlayer === player1Images ? player2Images : player1Images;
}

// function that checks if the player is won by going through all
// the wining combinations and checks if the player have onw of them
function checkWin(currentPlayer) {
    const currentClass = (currentPlayer === player1Images) ? 'player1' : 'player2';
    return winningCombinations.some(combination => {
        return combination.every(index => 
                board[index] === currentClass);
    });
}

// function that checks if the game is a
// draw by checking if all cells are filled
function isDraw() {
    return board.every(cell => cell !== null);
    };

// in case that the game is over the function check
// if its a draw or someone has won
function endGame(draw) {
    if (draw) {
        winnerImage.src = drawImage; // Set draw image
        document.getElementById('winnerMode').classList.remove('show');
        document.getElementById('drawMode').classList.add('show');
    } else {
        winnerImage.src = currentPlayer === player1Images ? player1Images[(player1Index - 1 + player1Images.length) % player1Images.length] : player2Images[(player2Index - 1 + player2Images.length) % player2Images.length];
        document.getElementById('winnerMode').classList.add('show');
        document.getElementById('drawMode').classList.remove('show');
        updateWins(currentPlayer === player1Images ? 'player1' : 'player2');
    }
    setTimeout(showImage, 500); // Show the image after 2 seconds

    function showImage() {
        winnerModal.style.display = 'flex'; // Show the modal
        // Hide the modal after 2 more seconds with fade-out effect
        setTimeout(() => {
            document.querySelector('.modal-content').style.animation = 'fadeOut 1s forwards';
            setTimeout(() => {
                winnerModal.style.display = 'none'; // Hide the modal after fade-out
            }, 1000); // Match the duration of the fade-out animation
        }, 4000); // Keep the modal visible for 2 seconds
        resetGame(false);
    }
}
// function that updates the count of the players winning
function updateWins(winner) {
    if (winner === 'player1') {
        player1Wins++;
        player1WinsElement.textContent = `Chavi Wins: ${player1Wins}`;
    } else {
        player2Wins++;
        player2WinsElement.textContent = `Shmulik Wins: ${player2Wins}`;
    }
}


newGameBtn.onclick = function() {
    resetGame(false); // Reset game but keep scores
}

restartGameBtn.onclick = function() {
    resetGame(true); // Reset game and scores
}

function resetGame(resetScores) {
    board = Array(9).fill(null);
    cellElements.forEach((cell, index) => {
        if(cell.innerHTML != '') {
            cell.innerHTML = ''; 
            cell.removeEventListener('click', handleClick); 
            cell.addEventListener('click', () => handleClick(cell, index), { once: true }); 
    }});
    currentPlayer = player1Images;
    // player1Index = 0;
    // player2Index = 0;
    if (resetScores) {
        player1Wins = 0;
        player2Wins = 0;
        player1WinsElement.textContent = 'Chavi Wins: 0';
        player2WinsElement.textContent = 'Shmulik Wins: 0';
    }
}

window.onclick = function(event) {
    if (event.target === winnerModal) {
        winnerModal.style.display = 'none';
        resetGame();
    }
}
