import React from 'react'
import { GAME_STATUS } from '../constants/gameBoard';
import { useGame } from '../hooks/useGame';


const Settings = ({
    open = false,
    showUsernameDialog=() => {},
    showLeaderBoard=() => {},
}) => {
    const { status, setLevel, level } = useGame();

    if(status !== GAME_STATUS.initial || !open){
        return null;
    }

    return (
        <div className='buttons' >
            <span onClick={() => showUsernameDialog(true)} className='game-btn'>Play </span>
            <span className='heading'>---------------</span>
            <span className='heading' style={{ textAlign: "center" }}>Levels</span>
            <span onClick={() => setLevel(0)} className={`game-btn ${level === 0 && "active"}`}>Easy </span>
            <span onClick={() => setLevel(1)} className={`game-btn ${level === 1 && "active"}`}>Medium </span>
            <span onClick={() => setLevel(2)} className={`game-btn ${level === 2 && "active"}`}>Hard </span>
            <span className='heading'>---------------</span>
            <span onClick={() => showLeaderBoard(true)} className='game-btn'>Leaderboard</span>
        </div>
    )
}

export default Settings;