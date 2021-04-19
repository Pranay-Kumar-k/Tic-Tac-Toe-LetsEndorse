import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { UserContext } from '../context/UserContext'
import axios from "axios";
import "./Home.css";

export default function Home() {
    const {user,setUser} = useContext(UserContext);
    const [room,setRoom] = useState("");
    const [error,setError] = useState(false);
    const history = useHistory();
    
    if(user === null) {
        history.push("/player");
    }
    
    const joinRoom = async (e) => {
        e.preventDefault();

        const options = {
            url:"http://localhost:5000/joinRoom",
            method:'POST',
            withCredentials:true,
            headers:{
                'Accept':"application/json",
                'Content-Type':'application/json;charset=UTF-8'
            },
            data:{
                room
            }
        };

        await axios(options)
        .then((res) => {
            history.push('/play/'+room);
            console.log(res)
        })
        .catch(err => console.log(err))
    }
    
    const generateUniqueId = () => {
        axios.get("http://localhost:5000/createRoom")
        .then((res) => {
            history.push("/play/"+res.data);
        })
    }


    return (
        <div className="Home">
            Hello {user && user.name}
            <div className="Error">{error}</div>
            <form onSubmit={joinRoom} id="room">
                <input type="text" 
                        value={room} 
                        onChange={(e) => {setError(""); setRoom(e.target.value)}}
                        id="join-room"
                        placeholder="Enter room Id" />
                <button>Join Room</button>
            </form>
            <div>OR</div>
            <button className="input-button" onClick={generateUniqueId}>Create Room</button>
        </div>
    )
}
