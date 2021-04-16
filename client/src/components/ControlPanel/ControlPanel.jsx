import React from 'react';
import './ControlPanel.scss'

function ControlPannel(props) {
    return (
        <div className={`control-panel ${props.darkMode}`}>
            <button className={`control-panel__button  ${props.darkMode}`} onClick={props.playGame}>Play</button>
            <button className={`control-panel__button  ${props.darkMode}`} onClick={props.newGame}>New Game</button>
            <button className={`control-panel__button  ${props.darkMode}`} onClick={props.darkModeActivate}>Dark Mode</button>
        </div>
    )
}

export default ControlPannel
