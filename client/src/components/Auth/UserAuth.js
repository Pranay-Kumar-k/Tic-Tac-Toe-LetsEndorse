import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import {v4 as uuidv4} from "uuid";
import Cookies from "universal-cookie";
import { Redirect } from 'react-router';

export default function UserAuth() {
    const [user,setUser] = useContext(UserContext);
    const [player,setPlayer] = useState("");
    const cookies = new Cookies();

    const handleRegister = (e) => {
        e.preventDefault();

        if(player) {
            const newUser = {
                name:player,
                id:uuidv4()
            }
            cookies.set('user',newUser,{path:"/"});
            setUser(newUser)
        }

    }

    if(user !== null && user !== undefined) {
        return <Redirect to="/"/>
    }

    return (
        <div>
            <form id="room">
            <input 
                type="text"
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
                id="player"
                placeholder="Enter your name"
            />
            <button onClick={handleRegister} className="input-button">Join Room</button>
            </form>
        </div>
    )
}
