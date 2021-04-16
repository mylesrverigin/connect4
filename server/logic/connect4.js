class Connect4 {

    generateBoard = () => {
        let board = []
        for (let i = 0; i < 6;i++){
            let row = new Array(7).fill(false)
            board.push(row)
        }
        return board 
    }

    constructor (){
        // board is 6row * 7col
        this.board = this.generateBoard()
    }

    returnBoard = () => {
        // return current board
        return this.board
    }

    placePiece = (marker,col) => {
        // places a piece onto board 
        // col is col to insert into
        // marker is what chart to insert 
        let rowIdx = this.rowtoPlace(col);
        if (rowIdx > -1){
            this.board[rowIdx][col] = marker;
        }else {
            return false
        }
        
    }

    rowtoPlace = (col) => {
        // determines row IDX to place marker in
        let colValues = this.getCol(col)
        for (let i=colValues.length-1;i>=0;i--){
            if (colValues[i] === false ){
                return i
            }
        }
        return -1
    }

    getCol = (col) => {
        // returns all the values in a col start from idx 0-endidx
        let returnArr = []
        for (let i=0;i<this.board.length;i++){
            returnArr.push(this.board[i][col])
        }
        return returnArr
    }

    newGame = () => {
        // resets board to empty to restart
        this.board = this.generateBoard()
    }

    isWin = () => {
        // checks if any win conditions exist
        if (this.rowWin()){return true}
        if (this.colWin()){return true}
        return false
    }

    consecutiveCheck = (arr) => {
        let consec = 1
        let final = false
        for (let i=1; i < arr.length;i++){
            if (arr[i] == false || arr[i] !== arr[i-1]){
                consec = 0
            }
            consec += 1
            if (consec >= 4){ final = true}
        }
        return final
    }

    rowWin = () => {
        // if 4 values in a row
        let condition = false;
        for (let ridx=0;ridx<this.board.length;ridx++){
            let row = this.board[ridx]
            if (this.consecutiveCheck(row)){
                condition = true
                break
            }
        }
        return condition
    }

    colWin = () => {
        let condition = false;
        for (let cidx=0;cidx<this.board[0].length;cidx++){
            let colValues = []
            for (let ridx=0;ridx<this.board.length;ridx++){
                colValues.push(this.board[ridx][cidx])
            }
            if (this.consecutiveCheck(colValues)){
                condition = true 
                break;
            }
            if (condition){ break }
        }
        return condition
    }

    diagWin = () => {
        // if 4 values line up diagonally 
    }

}

module.exports = Connect4;