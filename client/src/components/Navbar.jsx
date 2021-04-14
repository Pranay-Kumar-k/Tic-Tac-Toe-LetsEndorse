import React from 'react'
import {Link} from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <div className="Navbar">
            <Link to="/">
                <img id="logo" src="https://miro.medium.com/max/512/1*Syzc_BbO0QHTx74NLHcpiQ.png" alt="logo"/>
                <div href="/" id="tic-tac-toe">Tic-Tac-Toe</div>
            </Link>
        </div>
    )
}
