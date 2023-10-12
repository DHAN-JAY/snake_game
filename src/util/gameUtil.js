import { BOARD_LENGTH, BOARD_WIDTH } from "../constants/gameBoard";


export const setHighScore = (user = "Anonymous", score = 0) => {
    const leaderBoard = getLeaderBoardScores();
    if(!leaderBoard[user] || leaderBoard[user] < score){
        leaderBoard[user] = score;
        window.localStorage.setItem("leaderboard", JSON.stringify(leaderBoard))
    }
}

export const getHighScore = (user = "Anonymous") => {
    const leaderBoard = getLeaderBoardScores();
    return leaderBoard[user];
}

export const getLeaderBoardScores = () => {
    let leaderboard = {}
    try {
        leaderboard = JSON.parse(window.localStorage.getItem("leaderboard")) || {}
    } catch(e){
        leaderboard = {};
    }
    return leaderboard;
}

export const getTailMovement = (snakePosition) => {
    const lastPos = snakePosition[snakePosition.length - 1];
    const snakeSecondLastPos = snakePosition[snakePosition.length - 2];

    if(lastPos[0] < snakeSecondLastPos[0]){
        return 2;
    }
    if(lastPos[0] > snakeSecondLastPos[0]){
        return 3;
    }
    if(lastPos[1] > snakeSecondLastPos[1]){
        return 0;
    }
    if(lastPos[1] < snakeSecondLastPos[1]){
        return 1;
    }
}

export const getRandomInsectPosition = (otherPosition = null, snakePosition = []) => {
    const randomPos = {
        x: Math.floor(Math.random() * BOARD_WIDTH),
        y: Math.floor(Math.random() * BOARD_LENGTH)
    }
    let posFound = true;
    while(posFound){
        randomPos.x = Math.floor(Math.random() * BOARD_WIDTH);
        randomPos.y = Math.floor(Math.random() * BOARD_LENGTH);
        posFound = false;
        if(otherPosition){
            if(otherPosition.x === randomPos.x && otherPosition.y === randomPos.y){
                posFound = true;
            }
        }
        for(let posInd = 0; posInd < snakePosition.length; posInd++){
            let pos = snakePosition[posInd];
            if(pos[0] === randomPos.x && pos[1] === randomPos.y){
                posFound = true;
            }
        }
    }
    return randomPos;
}

export const getInitialBoardState = () => {
    let board = [];
    for(let i = 0; i < BOARD_LENGTH; i++){
        let col = [];
        for (let j = 0; j < BOARD_WIDTH; j++){
            if(parseInt(BOARD_WIDTH/2) === j){
                if(i === BOARD_LENGTH - 3){
                    col.push(1);
                    continue;
                }
                if(i === BOARD_LENGTH - 2){
                    col.push(3);
                    continue;
                }
                if(i === BOARD_LENGTH - 1){
                    col.push(2);
                    continue;
                }
            }
            col.push(0);
        }
        board.push(col);
    }
    return board;
} // 0 - empty, 1 - head, 2 - tail, 3 - body, 4 - insect, 5 - bonus

export const getPositionToMove = (snakeMovement, snakePosition) => {
    let positionToMove = { x: 0, y: 0}
    if(snakeMovement === 0){
        positionToMove.x = snakePosition[0][0];
        positionToMove.y = snakePosition[0][1] - 1;
    }
    if(snakeMovement === 1){
        positionToMove.x = snakePosition[0][0];
        positionToMove.y = snakePosition[0][1] + 1;
    }
    if(snakeMovement === 2){
        positionToMove.x = snakePosition[0][0] - 1;
        positionToMove.y = snakePosition[0][1];
    }
    if(snakeMovement === 3){
        positionToMove.x = snakePosition[0][0] + 1;
        positionToMove.y = snakePosition[0][1];
    }

    return positionToMove;
}

export const isGameOver = (positionToMove, snakePosition) => {
    if(positionToMove.x < 0 || positionToMove.x >= BOARD_WIDTH){
        return true;
    }
    if(positionToMove.y < 0 || positionToMove.y >= BOARD_LENGTH){
        return true;
    }
    for(let snakePosIndex = 1; snakePosIndex < snakePosition.length; snakePosIndex++){
        let pos = snakePosition[snakePosIndex];
        if(positionToMove.x === pos[0] && positionToMove.y === pos[1]){
            return true;
        }
    }
}
