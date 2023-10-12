
import React from 'react'
import { GAME_STATUS } from '../constants/gameBoard';
import { useGame } from '../hooks/useGame';
import { getHighScore } from '../util/gameUtil';


const GameOver = () => {
    const { status, username, score, startGame, setToInitialGameStatus } = useGame();

    if(status !== GAME_STATUS.over){
        return null;
    }


    return (
        <div className='game-over-container' >
            <span className='heading'>{username}</span>
            <span className='heading'>High Score: {getHighScore(username)}</span>
            <span className='heading'>Score: {score} </span>
            <span onClick={startGame} className='game-btn' >Play Again </span>
            <span onClick={setToInitialGameStatus} className='game-btn' >Back </span>
        </div>
    )
}

export default GameOver;