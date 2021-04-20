import React from 'react'

export default function Square({val,onClick}) {
    return (
        <div>
            <button className="square" onClick={  onClick } >
                { val ? val :''}
            </button>
        </div>
    )
}
