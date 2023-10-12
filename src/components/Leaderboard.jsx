import React from 'react'
import { getLeaderBoardScores } from '../util/gameUtil';


const Leaderboard = ({
    open = false,
    onClose = () => {}
}) => {
    const leaderBoard = getLeaderBoardScores();

    if(!open){
        return null;
    }

    return (
        <div className='leaderboard-container'>
            <span className='heading'> Leaderboard </span>
            <div style={{ height: "400px", overflowY: "auto", width: "calc(100% - 40px)"}}>
            {leaderBoard && Object.keys(leaderBoard).length &&
                Object.keys(leaderBoard).map((key) => {
                    const leaderScore = leaderBoard[key];

                    return (
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span className='heading' style={{ fontSize: "1.4rem"}}>{key}</span>
                            <span style={{ fontSize: "1.6rem", marginLeft: "40px"}}>{leaderScore}</span>
                        </div>
                    )
                })
            }
            </div>
            <span onClick={() => onClose(false)} className='game-btn'> Back </span>
        </div>
    )
}

export default Leaderboard;