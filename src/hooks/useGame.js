import React from 'react';
import { useEffect, useMemo, useState } from "react";
import { BOARD_LENGTH, BOARD_WIDTH, GAME_STATUS } from "../constants/gameBoard";
import { getInitialBoardState, getPositionToMove, getRandomInsectPosition, getTailMovement, isGameOver } from '../util/gameUtil';


const GameContext = React.createContext({});

export const useGame = () => React.useContext(GameContext);

let snakeMovement = 0; // 0 - up, 1 - down, 2 - left, 3 - right
let snakePosition = [
    [parseInt(BOARD_WIDTH/2), BOARD_LENGTH-3],
    [parseInt(BOARD_WIDTH/2), BOARD_LENGTH-2],
    [parseInt(BOARD_WIDTH/2), BOARD_LENGTH-1]
]
let addBonus = false, deleteBonus = false;
let bonusTimeout = null, gameTimeout = null, deleteBonusTimeout = null;

const listenToKeyboardEvent = () => {
    document.addEventListener("keydown", (ev) => {
        switch (ev.key) {
            case 'ArrowUp':
                snakeMovement = snakeMovement === 1 ? 1 :  0;
                break;
            case 'ArrowDown':
                snakeMovement = snakeMovement === 0 ? 0 : 1;
                break;
            case 'ArrowLeft':
                snakeMovement = snakeMovement === 3 ? 3 : 2;
                break;
            case 'ArrowRight':
                snakeMovement = snakeMovement === 2 ? 2 : 3;
                break;
            default:
                break;
        }
    })
}

const addBonuses = () => {
    bonusTimeout = setTimeout(() => {
        addBonus = true;
        deleteBonusTimeout = setTimeout(() => {
            deleteBonus = true;
            addBonus = false;
        }, 5000)
    }, 5000)
}

const getUpdatedBoard = (prevBoard) => {
    let positionToMove = getPositionToMove(snakeMovement, snakePosition)
    let scoreToAdd = 0;

    // check for game over
    if(isGameOver(positionToMove, snakePosition)){
        return  {
            board: prevBoard,
            isGameOver: true,
            scoreToAdd: scoreToAdd
        };
    }

    // check for score change
    if(prevBoard[positionToMove.y][positionToMove.x] === 5){
        scoreToAdd = 60;
        deleteBonus = false;
        if(deleteBonusTimeout){
            clearTimeout(deleteBonusTimeout);
            deleteBonusTimeout = null;
        }
        addBonuses();
    }
    if(prevBoard[positionToMove.y][positionToMove.x] === 4){
        scoreToAdd = 20;
        snakePosition.unshift([
            positionToMove.x, positionToMove.y
        ])
    } else {
        snakePosition = snakePosition.map((pos) => {
            const curPos = [positionToMove.x, positionToMove.y];
            positionToMove = {
                x: pos[0],
                y: pos[1],
            }
            return curPos;
        })
    }

    //initialize board with all zero except the insect and bonus column
    const currentBoard =  prevBoard.map((row) => {
        return row.map(col => {
            if(col === 4 || col === 5){
                return col;
            }
            return 0;
        })
    })

    // update board 
    snakePosition.forEach((pos, index) => {
        if(index === 0){
            currentBoard[pos[1]][pos[0]] = 1;
        }else if(index === snakePosition.length - 1){
            currentBoard[pos[1]][pos[0]] = 2;
        } else {
            currentBoard[pos[1]][pos[0]] = 3;
        }
    })
    let insectFound = null;
    let bonusFound = null;

    currentBoard.forEach((row, index1) => {
        row.forEach((col, index2) => {
            if(col === 4){
                insectFound = {
                    x: index2,
                    y: index1,
                };
            }
            if(col === 5){
                bonusFound = {
                    x: index2,
                    y: index1,
                };
            }
        })
    })

    if(bonusFound && deleteBonus){
        currentBoard[bonusFound.y][bonusFound.x] = 0;
        deleteBonus = false;
        addBonuses();
    }

    if(!bonusFound && addBonus){
        let randomPositionForInsect = getRandomInsectPosition(insectFound, snakePosition);
        currentBoard[randomPositionForInsect.y][randomPositionForInsect.x] = 5;
        addBonus = false;
    }

    if(!insectFound){
        let randomPositionForInsect = getRandomInsectPosition(bonusFound, snakePosition);
        currentBoard[randomPositionForInsect.y][randomPositionForInsect.x] = 4;
    }

    return {
        board: currentBoard,
        isGameOver: false,
        scoreToAdd: scoreToAdd
    };
}

const GameProvider = ({
    children
}) => {
    const [status, setStatus] = useState(GAME_STATUS.initial);
    const [board, setBoard] = useState(getInitialBoardState());
    const [score, setScore] = useState(0);
    const [username, setUserName] = useState("");
    const [level, setLevel] = useState(0); // easy - 0, medium - 1, hard - 2
    
    const snakeSpeed = useMemo(() => {
        return 150 - (level*50);
    }, [level])

    useEffect(() => {
        listenToKeyboardEvent();
    }, [])

    useEffect(() => {
        if(status !== GAME_STATUS.start && bonusTimeout){
            clearTimeout(bonusTimeout);
            bonusTimeout = null;
        }
        if(status !== GAME_STATUS.start && gameTimeout){
            clearTimeout(bonusTimeout);
            gameTimeout = null;
        }
        if(status !== GAME_STATUS.start && deleteBonusTimeout){
            clearTimeout(deleteBonusTimeout);
            deleteBonusTimeout = null;
        }
    }, [status])

    const updateGameOnInterval = (prevBoard) => {
        let gameData = getUpdatedBoard(prevBoard);
        if(!gameData.board){
            return;
        }
        setScore(prevScore => prevScore + gameData.scoreToAdd);
        if(gameData.isGameOver){
            setStatus(GAME_STATUS.over);
        } else {
            gameTimeout = setTimeout(() => updateGameOnInterval(gameData.board), snakeSpeed);
        }
        setBoard(gameData.board);
    }

    const startGame = () => {
        setStatus(GAME_STATUS.start);
        let randomPositionForInsect = getRandomInsectPosition(null, snakePosition);
        let initialBoardState = getInitialBoardState()
        initialBoardState[randomPositionForInsect.y][randomPositionForInsect.x] = 4
        setBoard(initialBoardState);
        setScore(0);
        snakeMovement = 0;
        snakePosition = [
            [parseInt(BOARD_WIDTH/2), BOARD_LENGTH-3],
            [parseInt(BOARD_WIDTH/2), BOARD_LENGTH-2],
            [parseInt(BOARD_WIDTH/2), BOARD_LENGTH-1]
        ]
        addBonuses();
        gameTimeout = setTimeout(() => updateGameOnInterval(initialBoardState), snakeSpeed);
    }

    return (
        <GameContext.Provider
            value={{
                startGame: startGame,
                setLevel: setLevel,
                level: level,
                status: status,
                board: board,
                score: score,
                snakeMovement: snakeMovement,
                tailMovement: getTailMovement(snakePosition),
                setToInitialGameStatus: () => setStatus(GAME_STATUS.initial),
                username,
                setUserName
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider;