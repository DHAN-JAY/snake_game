import React from 'react'
import { GAME_STATUS } from '../constants/gameBoard';
import { useGame } from '../hooks/useGame';


const Score = () => {
    const { status, score } = useGame();

    if(status !== GAME_STATUS.start){
        return null;
    }

    return (
        <div className='score-container'>
            <span className='heading'>Score:</span>
            <span className='heading'>{score}</span>
        </div>
    )
}

export default Score;