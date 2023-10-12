import React from 'react';
import '../css/game_board.css'
import GameProvider from '../hooks/useGame';
import Board from './Board';


const GameBoard = () => {
    
    return (
        <GameProvider>
            <div>
                <span className='heading' style={{ fontSize: "3rem"}}> Snake Game </span>
            </div>
            <Board />
        </GameProvider> 
    )
}

export default GameBoard;