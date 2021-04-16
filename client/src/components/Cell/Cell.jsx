import React from 'react';

function Cell(props) {
    return (
        <div className="square" onClick={() => props.cellListener(props.column)}>
            {props.token && <img src={props.token} className="square__image"/>}
        </div>
    )
}

export default Cell
