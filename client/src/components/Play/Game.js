import React from 'react'
import Board from './Board'
import './Game.css'

const Game = ({socket ,room}) => {
    return (
        <div>
            <div className="game">
                <div className="game-board">
                    <Board socket={socket} room={room} />
                </div>
                <div className="game-info">
                </div>
            </div>
        </div>
    )
}

export default Game