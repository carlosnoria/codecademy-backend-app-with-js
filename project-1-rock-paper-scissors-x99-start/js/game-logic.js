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
let maxValueRange = 99;

const verifyPlayerMovesTypes = (...playersMovesType) => {
    return playersMovesType.every(elem => moveTypes.includes(elem));
}

const verifyPlayerMovesValues = (...playersMovesValue) => {
    return playersMovesValue.every(elem => typeof elem === 'number' && elem > 0 && elem < 100);
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

    if (moveOneValue + moveTwoValue + moveThreeValue > 99) {
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

const checkRoundWinnerAux = (playerOneMoveType, playerOneMoveValue, 
    playerTwoMoveType, playerTwoMoveValue) => {
    if (!verifyPlayerMovesTypes(playerOneMoveType, playerTwoMoveType) 
        || !verifyPlayerMovesValues(playerOneMoveValue, playerTwoMoveValue)) {
        
        return null; 
    }

    if (playerOneMoveType === playerTwoMoveType) {
        if (playerOneMoveValue === playerTwoMoveValue) {
            return 'Tie';
        }else if (playerOneMoveValue > playerTwoMoveValue){
            return 'Player One';
        }else{
            return 'Player Two';
        }
    }

    switch (playerOneMoveType) {
        case 'rock':
            if (playerTwoMoveType === 'scissors') {
                return 'Player One'
            }else{
                return 'Player Two'
            }
        case 'scissors':
            if (playerTwoMoveType === 'paper') {
                return 'Player One'
            }else{
                return 'Player Two'
            }
        case 'paper':
            if (playerTwoMoveType === 'rock') {
                return 'Player One'
            }else{
                return 'Player Two'
            }
    }

}

const getRoundWinner = round => {
    if (!verifyRound(round)){
        return null;
    }

    switch(round){
        case 1:
            return checkRoundWinnerAux(playerOneMoveOneType, playerOneMoveOneValue, playerTwoMoveOneType, playerTwoMoveOneValue);
        case 2:
            return checkRoundWinnerAux(playerOneMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoType, playerTwoMoveTwoValue);
        case 3:
            return checkRoundWinnerAux(playerOneMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeType, playerTwoMoveThreeValue);
    }
}

const getGameWinner = () => {
    let roundResult;
    let playerOneScore = 0;
    let playerTwoScore = 0;
    for (let i = 1; i < 4; i++){
        roundResult = getRoundWinner(i);
        if (roundResult === null){
            return null;
        }

        switch (roundResult) {
            case 'Player One':
                playerOneScore++;
                break;
            case 'Player Two':
                playerTwoScore++;
                break;
            case 'Tie':
                playerOneScore++;
                playerTwoScore++;
                break;
        }
    }

    if(playerOneScore === playerTwoScore){
        return 'Tie';
    }

    return playerOneScore > playerTwoScore ? 'Player One': 'Player Two';
}

const valuesRangeAvailable = (valuesArray, insuredRange) => {
    let actualValuesRange = valuesArray.reduce((acum, elem) => acum + elem, 0);
    return maxValueRange - insuredRange - actualValuesRange;
}

const setComputerMoves = () => {
    let computerMovesTypes = [];
    let computerMovesValues = [];

    for (let i = 2; i >= 0; i--) {
        computerMovesTypes.push(moveTypes[Math.floor(Math.random()*moveTypes.length)]);
        computerMovesValues.push(Math.floor((Math.random()*valuesRangeAvailable(computerMovesValues, i))+1));
    }

    computerMovesValues[2] += valuesRangeAvailable(computerMovesValues, 0);

    setPlayerMoves('Player Two', computerMovesTypes[0], computerMovesValues[0], computerMovesTypes[1], computerMovesValues[1], computerMovesTypes[2], computerMovesValues[2]);

}

