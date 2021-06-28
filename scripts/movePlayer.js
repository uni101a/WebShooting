const pcPlayer = document.getElementById("pc-player");
const gameDisplay = document.getElementById("game-background");

//自機の初期位置
gameDisplayX = gameDisplay.clientWidth;
gameDisplayY = gameDisplay.clientHeight;
player.ownPosition.x = gameDisplayX/2.17;
player.ownPosition.y = gameDisplayY/10;

function moving(){
    //移動する値、速度の調整を行うパラメーター
    let moveX = 0, moveY = 0, speed=10, slowly=0.3;
    if( player.inputMoveKey.up == true && player.inputMoveKey.down == false ) moveY = 1;
    else if( player.inputMoveKey.up == false && player.inputMoveKey.down == true ) moveY = -1;
    if( player.inputMoveKey.left == true && player.inputMoveKey.right == false ) moveX = -1;
    else if( player.inputMoveKey.left == false && player.inputMoveKey.right == true ) moveX = 1;

    /*
    斜め移動の際移動速度を等速に制御する
    √2を1にするには0.70.7を掛けるのが一般
    */
    if(moveY != 0 && moveX != 0){
        moveX *= 0.707;
        moveY *= 0.707;
    }

    /*
    自機の位置から評価
    移動後の自機の各座標が負かどうか評価
        重なっていない時自機の座標に移動する値を加算
     */
    if(player.ownPosition.x + moveX * speed <= 0 || player.ownPosition.x + moveX * speed * 7 >= gameDisplayX || player.ownPosition.y + moveY * speed <= 0 || player.ownPosition.y + moveY * speed * 7 >= gameDisplayY){
    }
    else {
        moveX *= speed;
        moveY *= speed;
        //shiftキーが押されているとき減速
        if(player.shift){
            moveX *= slowly;
            moveY *= slowly;
        }
        player.ownPosition.x += moveX;
        player.ownPosition.y += moveY;
        //自機の位置を更新
    }
    pcPlayer.style.left = player.ownPosition.x + "px";
    pcPlayer.style.bottom = player.ownPosition.y + "px";
    /*
    再帰
    動きを滑らかにするには次の第二引数の値を小さくする
    */
    moveTimeout = setTimeout("moving()", 30);
}