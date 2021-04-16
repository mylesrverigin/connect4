import React from 'react';
import './WinBanner.scss'

function WinBanner(props) {
    return (
        <div className="win-banner">
            <h2 className="win-banner__title">Winner:</h2>
            <img src={props.image} alt="" className="win-banner__image"/>
        </div>
    )
}

export default WinBanner
