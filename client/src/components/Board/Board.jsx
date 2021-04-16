import React, { Component } from 'react';
import './Board.scss';
import Cell from '../Cell/Cell';

class Board extends Component {
    images = this.props.images
    render() {
        return (
            <div className={`board ${this.props.darkMode}`}>
                <img src={this.images[this.props.id === false ? '' : this.props.id % 5]} alt="" className="board__image"/>
                {this.props.board.map(row => {
                    return (
                    <div className="row">
                        {row.map((val, index) => {
                            return <Cell 
                                column={index}
                                cellListener={this.props.cellListener}
                                token={this.images[val === false ? '' : val % 5]}
                            />
                        })}
                    </div>)
                })}
            </div>
        )
    }
}

export default Board;