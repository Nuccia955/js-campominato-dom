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
    case '1': gridNumberOfSquares = 16;
              gridRowCells = 4;
              break;
    case '2': gridNumberOfSquares = 81;
              gridRowCells = 9;
              break;
    case '3': gridNumberOfSquares = 49;
              gridRowCells = 7;
    }

    //8. create a 16 unique random numbers list 
    const bombList = genUniqueRandNumbersList( 4, 1, gridNumberOfSquares);
    console.log('bombList', bombList);
    const attempts = [];
    const maxAttempts = gridNumberOfSquares - bombList.length;
    console.log('maxAttempts', maxAttempts);

    //2.2 ...and generate grid with btn-Play
    const grid = document.createElement('div');
    grid.classList.add('grid-wrap');

    for (let i = 1; i <= gridNumberOfSquares; i++) {
        //4. call function to create a square
        const square = generateSquare(i, gridRowCells);
        grid.append(square);
        //5. on squares add click event for changing background-color
        square.addEventListener('click', () => {
            // game processing
            const squareValue = parseInt(square.innerHTML);
            console.log('squareValue', squareValue);
            if (bombList.includes(squareValue)) {
                square.classList.add('bg-red');
                console.log('you lose!'); // function endGame
            } else if (!attempts.includes(squareValue)) {
                square.classList.add('bg-blue');
                attempts.push(squareValue);
                console.log('attempts', attempts);
                if (attempts.length === maxAttempts) {
                    console.log('hai vinto!'); // function endGame
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




