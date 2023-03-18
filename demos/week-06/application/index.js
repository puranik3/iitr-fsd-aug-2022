var cells = document.querySelectorAll( '.game__cell' );
var gameStartBtn = document.querySelector( '.game__start' );
var gameStatusBox = document.querySelector( '.game__status' );

// state of the game
var gameStatus = false; // true / false
var cellValues = [
    '', '', '',
    '', '', '',
    '', '', ''
];
var current;

// winning states
var winningStates = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 6, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ]
];

function showNextPlayerMessage() {
    gameStatusBox.innerHTML = 'Next turn - ' + current;
}

function startGame() {
    gameStatus = true;
    current = 'X';

    cellValues = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    // cleanup the board
    cells.forEach(function( cell ) {
        cell.innerHTML = '';
    });

    // cleanup the message
    showNextPlayerMessage();
}

function checkIfGameOver() {
    for( var idx = 0; idx < winningStates.length; idx++ ) {
        var ws = winningStates[idx];

        var i = ws[0];
        var j = ws[1];
        var k = ws[2];

        var a = cellValues[i];
        var b = cellValues[j];
        var c = cellValues[k];

        // if someone has won...
        if( a !== '' && a === b && b === c ) {
            gameStatusBox.innerHTML = current + ' won';
            return true;
        }
    }

    // check if game ended in a draw
    if( cellValues.includes( '' ) ) {
        return false;
    } else {
        gameStatusBox.innerHTML = 'Game ended in a draw';
        return true;
    }
}

function onCellClick() {
    if( gameStatus === false ) {
        alert( 'Please start the game first' );
        return;
    }

    const cell = this;

    const idx = cell.getAttribute( 'data-cell-index' );

    if( cellValues[idx] !== '' ) {
        alert( 'Already occupied. Try again' );
        return;
    }

    cellValues[idx] = current;
    cell.innerHTML = current;

    if( checkIfGameOver() ) {
        gameStatus = false;
        return;
    } else {
        current = ( current == 'X' ) ? 'O' : 'X';
        showNextPlayerMessage();
    }
}

gameStartBtn.addEventListener( 'click', startGame );
cells.forEach(function( cell ) {
    cell.addEventListener( 'click', onCellClick );
});