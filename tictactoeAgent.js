class Agent {
    constructor() {
    }

    minimax(board, isMaximizing){
        const gameState = board.gameOver();
        if(gameState === 1){
            return 1;
        } else if (gameState === 2){
            return -1;
        } else if (gameState === 3){
            return 0;
        }

        let score;
        if(isMaximizing){
            score = -Infinity;
        } else {
            score = Infinity
        }
        let tempBoard = null;
        for(let i = 0; i < board.cells.length; i++){
            let position = i + 1;
            if (isMaximizing && board.cellFree(position)){
                tempBoard = board.clone();
                tempBoard.move(position);

                let tempScore = this.minimax(tempBoard, false);
                if(tempScore > score){
                    score = tempScore;
                }
            } else if (board.cellFree(position)){
                tempBoard = board.clone();
                tempBoard.move(position);

                let tempScore = this.minimax(tempBoard, true);
                if(tempScore < score){
                    score = tempScore;
                }
            }
        }
        return score;

    }

    selectMove(board){
        let minMove = null;
        let minBestChoice = Infinity;

        let maxMove = null;
        let maxBestChoice = -Infinity;

        let tempBoard = null;
        let score = 0;

        //Check all the cells that are free
        for(let i = 0; i < board.cells.length; i++){
            let position = i + 1;
            if(board.cellFree(position)){
                tempBoard = board.clone();
                tempBoard.move(position);

                if(board.playerOne){
                    score = this.minimax(tempBoard, false);

                    if(score > maxBestChoice){
                        maxBestChoice = score;
                        maxMove = position;
                    }
                } else {
                    score = this.minimax(tempBoard, true);

                    if(score < minBestChoice){
                        minBestChoice = score;
                        minMove = position;
                    }
                }
            }
        }

        if(board.playerOne){
            return maxMove;
        } else {
            return minMove;
        }
    }
}