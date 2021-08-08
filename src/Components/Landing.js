import React from 'react'
import Main from './Main'
import {Link } from "react-router-dom";

function Landing() {
    return (
        <div>
            <h1>Marvel A.P.I.</h1>
            <h2>Enter True Believers</h2>
            {/* <li><Link to="/Main">React</Link></li> */}
            <Link to="/Main"><button>Enter</button>
            </Link>
        </div>
    )
}

export default Landing
