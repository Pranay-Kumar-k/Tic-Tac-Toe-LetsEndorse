import React, { useCallback, useContext, useRef, useState } from 'react'
import { UserContext } from '../../context/UserContext'

export default function Board({socket,room}) {
    const {user,setUser} = useContext(UserContext);
    const [squares,setSquares] = useState(Array(9).fill(null));
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const isNext = useRef(true);
    const chance = useRef(1);
    const player = useRef("");
    const winner = calculateWinner(squares);
    let status;

    if(winner) {
        status = (player.current === user.id) ? "Winner" : "Better luck next time";
    }
    else {
        status = (player.current !== user.id) ? "Your Turn" : "Opponent Turn";
    }

    useEffect(() => {
        socket.on("clickReceived", click => {
            const i = click.i;
            squares[i] = isNext.current ? 'X' : 'O';
            isNext.current = !isNext.current;
            setSquares(squares);

            player.current = click.user_id;
            if(chance.current === 2 ) {
                chance.current = 1;
            }
            if(chance.current === -1) {
                chance.current = 2;
            }
            forceUpdate();

        })
    }, [squares,isNext])

    useEffect(() => {
        socket.on('playAgain', () => {
            squares.fill(null);
            setSquares.apply(squares);
            chance.current = 1;
            player.current = "";
            forceUpdate();
        })
    }, [squares])

    const handleClick = (i) => {
        if(chance.current === 2 || chance.current === -1 || calculateWinner(squares) || squares[i]) {
            return;
        }

        const click = {
            i,
            name:user.name,
            user_id:user.id,
            room
        }
        socket.emit('Clicked', click);
        chance.current= -1;
    }

    const playAgain = () => {
        socket.emit('playAgain', room)
    }

    const renderSquare = (i) => {
        return <Square val={squares[i]} onClick={() => handleClick(i)} />
    }

    return (
        <div id="Board">
            <div className="status">{status}</div>
            <div id="Board_game">
                <div className="Board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="Board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="Board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <button onClick={playAgain} className="input-button">Play Again</button>
        </div>
    )
}
