import React from 'react'
import { useGame } from '../hooks/useGame';


const Cell = ({
    col
}) => {
    const { snakeMovement, tailMovement } = useGame();

    const getClassName = () => {
        if(col === 1){
            return "cell snake_head";
        }
        if(col === 2){
            return "cell snake_tail";
        }
        if(col === 3){
            return "cell snake_body";
        }
        if(col === 4){
            return "cell insect";
        }
        if(col === 5){
            return "cell bonus";
        }

        return "cell";
    }

    return (
        <div 
            data-move={col === 1 && snakeMovement} 
            className={getClassName()}
            data-tail-move={col === 2 && tailMovement}
        >
        </div>
    )
}

export default Cell;