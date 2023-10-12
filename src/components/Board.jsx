import React, { useState } from 'react'
import { GAME_STATUS } from '../constants/gameBoard';
import { useGame } from '../hooks/useGame';
import Cell from './Cell';
import GameOver from './GameOver';
import Leaderboard from './Leaderboard';
import Score from './Score';
import Settings from './Settings';
import UsernameDialog from './UsernameDialog';


const Board = () => {
    const { status, board } = useGame();
    const [showUserNameDialog, setShowUserNameDialog] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    return (
        <div className='board'>
            <UsernameDialog
                open={showUserNameDialog}
                onClose={setShowUserNameDialog}
            />
            <Leaderboard
                open={showLeaderboard}
                onClose={setShowLeaderboard}
            />
            <GameOver />
            <Settings
                open={!showLeaderboard && !showUserNameDialog}
                showLeaderBoard={setShowLeaderboard}
                showUsernameDialog={setShowUserNameDialog}
            />
            {status !== GAME_STATUS.start &&
                <div className='cover-board'></div>
            }
            <Score />
            {status !== GAME_STATUS.initial && board?.length &&
                board.map((row, indexR) => {
                    return (
                        <>
                            {row?.length &&
                                row.map((col, indexC) => {

                                    return (
                                        <Cell key={indexR + "_cell_" + indexC} col={col} />
                                    )
                                })
                            }
                        </>
                    )
                })
            }
        </div>
    )
}

export default Board;