//1. DOM selection
let mainContent = document.querySelector('.main-section');
const btnPlay = document.querySelector('#btn-play');
const selection = document.querySelector('#selection');

//2.1. switch grid dimensions with level-select...
btnPlay.addEventListener('click', function() {
    mainContent.innerHTML = '';
    const levelSelection = selection.value;
    let gridNumberOfSquares;
    let gridRowCells;
    switch (levelSelection) {
    case '1': gridNumberOfSquares = 100;
              gridRowCells = 10;
              break;
    case '2': gridNumberOfSquares = 81;
              gridRowCells = 9;
              break;
    case '3': gridNumberOfSquares = 49;
              gridRowCells = 7;
    }

    //8. create a 16 unique random numbers list 
    const bombList = genUniqueRandNumbersList( 16, 1, gridNumberOfSquares);
    console.log(bombList);
    const attempts = [];
    const maxAttempts = gridNumberOfSquares - bombList.length;

    //2.2 ...and generate grid with btn-Play
    const grid = document.createElement('div');
    grid.classList.add('grid-wrap');

    for (let i = 1; i <= gridNumberOfSquares; i++) {
        //4. call function to create a square
        const square = generateSquare(i, gridRowCells);
        grid.append(square);
        //5. on squares add click event for changing background-color
        square.addEventListener('click', () => {
            // game processing ---> to do: transform in function
            const squareValue = parseInt(square.innerHTML);
            if (bombList.includes(squareValue)) {
                endGame (gridNumberOfSquares, bombList, attempts, maxAttempts);
            } else if (!attempts.includes(squareValue)) {
                square.classList.add('bg-blue');
                attempts.push(squareValue);
                if (attempts.length === maxAttempts) {
                    endGame (gridNumberOfSquares, bombList, attempts, maxAttempts);
                }
            }
        });
    }

    mainContent.append(grid);
});


/************
 * FUNCTIONS
 * **********/
//3. define function to create a square
function generateSquare(number, cells) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `calc(100% / ${cells})`;
    square.style.height = `calc(100% / ${cells})`;
    square.append(number);
    return square;
}

//6. define function to generate random number 
function generateRandNumber (min, max) {
    return Math.floor( Math.random () * (max - min + 1) + min );
}

//7. define function to generate a list of unique random numbers
function genUniqueRandNumbersList (target, min, max) {
    let list = [];
    while ( list.length < target) {
        const randNum = generateRandNumber (min, max);
        if ( !list.includes(randNum)) {
            list.push(randNum);
        }
    }
    return list;
}

//9. define function to decide if you clicked a bomb or a safe number


//10. define function for the end of game
function endGame (numberOfSquares, list, attempts, maxAttempts) {
    //1. reveal all the bombs
    //   refs
    const squares = document.querySelectorAll('.square');
    //   - get all bomb squares and add bg-red
    for (i = 0; i < numberOfSquares; i++) {
        const square = squares[i];
        const squareValue = parseInt(square.innerHTML);
        if (list.includes(squareValue)) {
            square.classList.add('bg-red');
        }
    }

    //2. add message (if win/loose) below grid
    let message = `Hai vinto! Hai indovinato ${maxAttempts} numeri! Clicca 'Play' in alto a destra per giocare di nuovo!`;
    if (attempts.length < maxAttempts) {
        message = `Oh no! Hai perso! Hai indovinato ${attempts.length} numeri su ${maxAttempts}`;
    } 
    const messageNode = document.createElement('h2');
    messageNode.append(message);
    document.querySelector('.main-section').append(messageNode);
    
    //3. if you loose or guess all numbers you cannot continue the game
    document.querySelector('.grid-wrap').classList.add('end-game');
}





