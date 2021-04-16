import React from 'react';

function Cell(props) {
    console.log(props.token)
    return (
        <div className="square" onClick={() => props.cellListener(props.column)}>
            {props.token && <img src={props.token} className="square__image"/>}
        </div>
    )
}

export default Cell
