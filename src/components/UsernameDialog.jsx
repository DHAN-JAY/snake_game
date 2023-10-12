import React, { useEffect } from 'react'
import { GAME_STATUS } from '../constants/gameBoard';
import { useGame } from '../hooks/useGame';
import { setHighScore } from '../util/gameUtil';


const UsernameDialog = ({
    open = false,
    onClose =() => {}
}) => {
    const { status, startGame, score, setUserName, username } = useGame();

    useEffect(() => {
        if(status === GAME_STATUS.start){
            setHighScore(username, score);
        }
    }, [username, score, status])

    if(!open){
        return null;
    }

    return (
        <div className='game-over-container'>
            <input 
                type="text" 
                placeholder='username' 
                onChange={(evt) => setUserName(evt.target.value)}
                value={username}
            />
            <span 
                onClick={
                    () => { 
                        onClose(false); 
                        startGame();
                    }
                } 
                className='game-btn'
            >
                Start Game 
            </span>
            <span 
                onClick={
                    () => { 
                        onClose(false);
                    }
                } 
                className='game-btn'
            >
                Back
            </span>
        </div>
    )
}

export default UsernameDialog;