// 获取grid_cell坐标
function getPosX(x, y) {
    return 120*y
}

function getPosY(x, y) {
    return 120*x
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function isBlockX(row, col1, col2, board) {
    // use for moveLeft() and moveRight()
    if (col1 == col2 - 1 || col1 == col2 + 1) {
        return false;
    }

    if (col1 < col2) {
        var fromCol = col1;
        var toCol = col2; 
    } else {
        fromCol = col2;
        toCol = col1;
    }

    for (var col = fromCol+1; col < toCol; col++) {
        if (board[row][col] != 0) {
            return true;
        }
    }

    return false;
}

function isBlockY(row1, row2, col, board) {
    if (row1 == row2-1 || row1 == row2+1) {
        return false;
    }

    if (row1 < row2) {
        var fromRow = row1;
        var toRow = row2;
    } else {
        fromRow = row2;
        toRow = row1;
    }

    for (var row = fromRow+1; row < toRow; row++) {
        if (board[row][col] != 0) {
            return true;
        }
    }

    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveDown(board) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }

    return false;
}

// test
// look in board
function watchBoard() {
    console.log("board:");
    for (var i = 0; i < 4; i++) {
        console.log(board[i][0] + "," + board[i][1] + "," + board[i][2] + "," + board[i][3]);
        console.log("-----");
    }
    console.log("==============");
}

function noSpace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function noMove(board) {
    if (canMoveDown(board) ||
        canMoveUp(board) ||
        canMoveRight(board) ||
        canMoveLeft(board)) {
        return false;
    }
    return true;
}