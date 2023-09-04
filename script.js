const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElement = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let CIRCLE_Turn = false

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    isCIRCLE_turn = false
    cellElement.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleCellClick)
        cell.addEventListener('click',handleCellClick, {once:true})
    });
    setBoardHoverClass()
        winningMessageElement.classList.remove('show')
    }

    function handleCellClick(e){
        const cell = e.target
        const currentClass = isCIRCLE_Turn ? CIRCLE_CLASS : X_CLASS
        placeMark(cell, currentClass)
        if (checkWin(currentClass)) {
            endGame(false)
        }else if(isDraw()){
            endGame(true)
        }else{
            swapTurns()
            setBoardHoverClass()
        }
    }
    function endGame(draw) {
        if (draw){
            winningMessageTextElement.innerText = 'Draw!'
        } else {
            winningMessageTextElement.innerText = `${CIRCLE_Turn ? "O's" : "X's"} Wins!`
        }
        winningMassageElement.classList.add('show')
    }

    function isDraw() {
        return [...cellElement].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
        })
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass)
    }

    function swapTurns(){
        isCIRCLE_Turn = !isCIRCLE_Turn
    }

    function setBoardHoverClass(){
        boardElement.classList.remove(X_CLASS)
        boardElement.classList.remove(CIRCLE_CLASS)
        if (CIRCLE_Turn) {
            boardElement.classList.add(CIRCLE_CLASS)
        } else {
            boardElement.classList.add(X_CLASS)
        }
    }
    function checkWin (currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index =>{
                return cellElements[index].classList.contains(currentClass)
            })
        })
    }
    
