var board = [];
var score = 0;

$(document).ready(function () {
    // 开始游戏
    newGame();

    $("#new-game-btn").click(function () {
        newGame();
    })
});

function newGame() {
    // 初始化
    init();

    // 随机生成数字两次
    generateNummer();
    generateNummer();
}

function init() {
    // 初始化 board
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    // 初始化 grid-cell
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("left", getPosX(i, j));
            gridCell.css("top", getPosY(i, j));
        }
    }

    // board[0][0] = 2;
    renderBoard();

}

function renderBoard() {

    $(".number-cell").remove();

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>")
            var numberCell = $("#number-cell-"+i+"-"+j);

            if (board[i][j] == 0) {
                numberCell.css("width", "0");
                numberCell.css("height", "0");
                numberCell.css("left", getPosX(i, j)+50);
                numberCell.css("top", getPosY(i, j)+50);
            } else {
                numberCell.css("left", getPosX(i, j));
                numberCell.css("top", getPosY(i, j));
                numberCell.text(board[i][j]);
            }
        }
    }
}

function generateNummer() {
    
    // 随机位置
    // X: 0-3 Y: 0-3
    var randomX = parseInt(Math.floor(Math.random() * 4));
    var randomY = parseInt(Math.floor(Math.random() * 4));

    while(true) {
        if (board[randomX][randomY] == 0) {
            break;
        }
        randomX = parseInt(Math.floor(Math.random() * 4));
        randomY = parseInt(Math.floor(Math.random() * 4));
    }

    // 随机数字
    // 2或4
    var randomNum = (Math.random() > 0.5) ? 2 : 4;

    // 显示随机数字
    board[randomX][randomY] = randomNum;
    showNumber(randomX, randomY, randomNum);

    // test
    // console.log("x: " + randomX + " y:" + randomY + " number: " + randomNum);
    // console.log(typeof(randomNum));

    // test board
    watchBoard();
}

$(document).keydown(function (event) {

    switch(event.keyCode) {
        case 37: // left
            if (moveLeft()) {
                generateNummer();
            }
            break;
        case 38: // top
            if (moveTop()) {
                generateNummer();
            }
            break;
        case 39: // right
            if (moveRight()) {
                generateNummer();
            }
            break;
        case 40: // bottom
            if (moveBottom()) {
                generateNummer();
            }
            break;
        default:
            break;
    }
});

function moveLeft() {

    if (!canMoveLeft(board)) {
        return false;
    }

    // move left
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {

                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && !isBlockX(i, j, k, board)) {
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && !isBlockX(i, j, k, board)) {
                        board[i][k] = 2 * board[i][k];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    renderBoard();

    return true;
}

function moveRight() {

    if (!canMoveRight(board)) {
        return false;
    }

    // move right
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {

                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && !isBlockX(i, j, k, board)) {
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && !isBlockX(i, j, k, board)) {
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    renderBoard();
    return true;
}

function moveTop() {
    if (!canMoveTop(board)) {
        return false;
    }

    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {

                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && !isBlockY(i, k, j, board)) {
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && !isBlockY(i, k, j, board)) {
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }

    renderBoard();
    return true;
}

function moveBottom() {
    if (!canMoveBottom(board)) {
        return false;
    }

    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {

                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && !isBlockY(i, k, j, board)) {
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && !isBlockY(i, k, j, board)) {
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }

    renderBoard();
    return true;
}