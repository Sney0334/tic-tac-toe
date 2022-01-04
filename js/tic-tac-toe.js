const classNames = {
    cell: 'cell',
    cellContent: 'cell-content',
    populated: 'populated',
    winner: 'winner'
};

const user = {
    x: 'X',
    o: 'O'
};

const winnerType={
    tie: 'tie'
}

const winningMatrix = {
    0: [[1,2],[3,6],[4,8]],
    1: [[0,2],[4,7]],
    2: [[0,1],[5,8],[4,6]],
    3: [[0,6],[4,5]],
    4: [[2,6],[3,5],[1,7],[0,8]],
    5: [[3,4],[2,8]],
    6: [[7,8],[0,3],[2,4]],
    7: [[6,8],[1,4]],
    8: [[6,7],[2,5],[0,4]]
};

let cellValues = ['','','','','','','','','']
let xIsNext = true;
let winningUser;
let numberOfTurnsLeft = 9;
let winningCombination = [];

const cells = document.querySelectorAll(`.${classNames.cell}`);
const modalOverlay = document.querySelector('#modal-overlay');
const winnerDetails = document.querySelector('#winner-container > span');
const newGameButton = document.querySelector('#new-game-button');


const calculateWinner = (choosenIndex) => {
    const winningRanges = winningMatrix[choosenIndex];

    for(let i = 0; i < winningRanges.length; i++) {
        const currentEntry = cellValues[choosenIndex];
        const firstOption = cellValues[winningRanges[i][0]];
        const secondOption = cellValues[winningRanges[i][1]];

        if(currentEntry == firstOption && firstOption == secondOption){
            winningUser = currentEntry;
            winningCombination = [choosenIndex, winningRanges[i][0], winningRanges[i][1]]
            return true;
        }
    }
    if(numberOfTurnsLeft ===0){
        winningUser = winnerType.tie;
        winningCombination = [];
        return true;
    }
    return false;
}

const showModal = () =>{
    if(winningUser === winnerType.tie){
        winnerDetails.innerText = `It was a tie.`;
    }else{
        winnerDetails.innerText = `Winner is ${winningUser}`;
    }
   
    modalOverlay.style.display = 'flex';
}


const highlightWinningCells = () =>{
    cells[winningCombination[0]].classList.add(classNames.winner);
    cells[winningCombination[1]].classList.add(classNames.winner);
    cells[winningCombination[2]].classList.add(classNames.winner);
}



const startGame = () =>{
    cellValues = ['','','','','','','','',''];
    xIsNext = true;
    winningUser = undefined;
    numberOfTurnsLeft = 9;
    winningCombination = [];

    cells.forEach((c,i) =>{
        const cellContent = c.querySelector(`.${classNames.cellContent}`);
        cellContent.innerText = cellValues[i];
        cellContent.classList.remove(classNames.populated);
        c.classList.remove(classNames.winner)
    })

    modalOverlay.style.display = 'none';
}

newGameButton.addEventListener('click', ()=>{
    startGame();
})
// c is for cells and i is for index, i is to check the index
cells.forEach((c, i) => {

    c.addEventListener('click', ()=>{
        console.log("clicked cell")
        if(!cellValues[i]){
            cellValues[i] = xIsNext ? user.x : user.o;
        xIsNext = !xIsNext;
        numberOfTurnsLeft--;


            if(calculateWinner(i)){
                if(winningUser !== winnerType.tie){
                    highlightWinningCells();
                }
                showModal();
            }
        const cellContent = c.querySelector(`.${classNames.cellContent}`);
        cellContent.innerText = cellValues[i];
        cellContent.classList.add(classNames.populated)
        }
    })
})

