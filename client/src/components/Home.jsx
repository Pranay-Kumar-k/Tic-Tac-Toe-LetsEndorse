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
    return (
        <div>
            Home
        </div>
    )
}
