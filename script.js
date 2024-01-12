const squares = document.querySelectorAll('.square');
const commentary = document.querySelector('.commentary');
const commentary2 = document.querySelector('.commentary-2');
let turnCount = 1;
let playerSymbol = 'X';

squares.forEach(function(square) {
    square.addEventListener('click', play)
})

let games = ["","","","","","","","",""];
let winning = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function play(event) {
    let squareChosen = event.target;
    let squareIndex = squareChosen.dataset.index;

// Checking if the square is already filled
if (games[squareIndex - 1] !== "") {
    alert("This square is already filled. Choose an empty square.");
    return;
}

games[squareIndex - 1] = playerSymbol;
squareChosen.textContent = playerSymbol;

// Check for a win or a draw
if (checkWin()) {
    commentary.textContent = `Le joueur ${playerSymbol} a gagné !`;
    commentary.classList.add(`win-text`); 
    commentary2.textContent = `Appuyez sur F5 (Windows) ou Cmd + R (Mac) pour recommencer.`;
    squares.forEach(function(square) {
        square.removeEventListener('click', play);
    })
} else if (turnCount === 9) {
    commentary.textContent = `Match nul.`;
    commentary.classList.add('draw-text');
    commentary2.textContent = `Appuyez sur F5 (Windows) ou Cmd + R (Mac) pour recommencer.`;
    squares.forEach(function(square) {
        square.removeEventListener('click', play);
    })
// Normal gameplay before a win/draw
} else {
    playerSymbol = playerSymbol === 'X' ? 'O' : 'X';
    commentary.textContent = `Au tour de ${playerSymbol}`;
}

turnCount++;
}

function checkWin() {
for (let i = 0; i < winning.length; i++) {
    const [a, b, c] = winning[i];
    if (games[a] && games[a] === games[b] && games[a] === games[c]) {
        return true;
    }
}
return false;
}

