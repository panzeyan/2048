function showNumber(i, j, number) {
    // 获取动画对象
    var numberCell = $("#number-cell-"+i+"-"+j);

    numberCell.text(number);

    // 添加动画效果
    numberCell.animate({
        "width": "100px",
        "height": "100px",
        "left": getPosX(i, j),
        "top": getPosY(i, j)
    }, 100);

}

function showMoveAnimation(fromX, fromY, toX, toY) {
    var theCell = $("#number-cell-"+fromX+"-"+fromY);
    theCell.animate({
        "left": getPosX(toX, toY),
        "top": getPosY(toX, toY)
    }, 200);
}