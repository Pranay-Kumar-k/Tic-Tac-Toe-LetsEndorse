import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { UserContext } from '../context/UserContext'

export default function Home() {
    const {user,setUser} = useContext(UserContext);
    const [room,setRoom] = useState("");
    const [error,setError] = useState(false);
    const history = useHistory();
    
    // if(user === null) {
    //     history.push("/");
    // }
    
    const joinRoom = () => {
        
    }
    
    const generateUniqueId = () => {
        axios.get("http://localhost:5000/createRoom")
        .then((res) => {
            history.push("/play"+res.data);
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
