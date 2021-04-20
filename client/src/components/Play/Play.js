import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import io from "socket.io-client";
import { Redirect } from 'react-router';

export default function Play() {
    const {user,setUser} = useContext(UserContext);
    const room = useParams();
    const [socket,setSocket] = useState(false);
    const [play,setPlay] = useState(false);
    const url = "http://localhost:5000/";
    let Emit;

    useEffect(() => {
        Emit = io(url);
        setSocket(true);

       if(!user) {
           return;
       }
       socket.emit('join', room);
       console.log(user.name+" "+user.id+" "+room);
    }, [url])

    useEffect(() => {
        Emit.on('you can play now', () => {
            setPlay(true);
        })
    }, [])

    if(!user) {
        return <Redirect to="/" />
    }

    return (
        (play && socket) ? (<div className="Play">
            {/* <Board></Board> */}
        </div>) : (<div>Loading</div>)
    )
}
