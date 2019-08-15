// All code should be written in this file.
// Player One
let playerOneMoveOneType;
let playerOneMoveTwoType;
let playerOneMoveThreeType;

let playerOneMoveOneValue;
let playerOneMoveTwoValue;
let playerOneMoveThreeValue;

// Player Two
let playerTwoMoveOneType;
let playerTwoMoveTwoType;
let playerTwoMoveThreeType;

let playerTwoMoveOneValue;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeValue;

let moveTypes = ['rock', 'paper', 'scissors'];

const verifyPlayerMovesTypes = (moveOneType, moveTwoType, moveThreeType) => {
    if (!moveTypes.includes(moveOneType) || !moveTypes.includes(moveTwoType) 
        || !moveTypes.includes(moveThreeType)){
        return false;
    }

    return true;
}

const verifyPlayerMovesValues = (moveOneValue, moveTwoValue, moveThreeValue) => {
    if (typeof moveOneValue != 'number' || typeof moveTwoValue != 'number' 
        || typeof moveThreeValue != 'number'){
        return false;
    }

    if(moveOneValue < 1 || moveTwoValue < 1 || moveThreeValue < 1){
        return false;
    }

    if(moveOneValue + moveTwoValue + moveThreeValue > 99){
        return false;
    }

    return true;
}

const verifyRound = round => {
    return typeof round === 'number' && round > 0 && round < 4;
}

const setPlayerMoves = (player, moveOneType, moveOneValue, moveTwoType,
     moveTwoValue, moveThreeType, moveThreeValue) => {
    
    if (!verifyPlayerMovesTypes(moveOneType, moveTwoType, moveThreeType) 
        || !verifyPlayerMovesValues(moveOneValue, moveTwoValue, moveThreeValue)){
        return;
    } 

    if (player === 'Player One') {
        playerOneMoveOneType = moveOneType;
        playerOneMoveOneValue = moveOneValue;
        playerOneMoveTwoType = moveTwoType;
        playerOneMoveTwoValue = moveTwoValue;
        playerOneMoveThreeType = moveThreeType;
        playerOneMoveThreeValue = moveThreeValue;
    }else if (player === 'Player Two') {
        playerTwoMoveOneType = moveOneType;
        playerTwoMoveOneValue = moveOneValue;
        playerTwoMoveTwoType = moveTwoType;
        playerTwoMoveTwoValue = moveTwoValue;
        playerTwoMoveThreeType = moveThreeType;
        playerTwoMoveThreeValue = moveThreeValue;
    }
}

const getRoundWinner = round => {
    if (!verifyRound(round)){
        return null;
    }
}

