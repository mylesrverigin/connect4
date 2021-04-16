import React from 'react';
import './ControlPanel.scss'

function ControlPannel(props) {
    return (
        <div className="control-panel">
            <button className="control-panel__button" onClick={props.playGame}>Play</button>
            <button className="control-panel__button" onClick={props.newGame}>New Game</button>
            <button className="control-panel__button">Dark Mode</button>
        </div>
    )
}

export default ControlPannel
