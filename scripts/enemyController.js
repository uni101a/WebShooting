let enemySpawnArray = []; //敵の情報を格納する配列

let enemyMoveTimeouut; //動きのコールバック関数を制御

const bossHPText = document.getElementsByClassName("bossHPText"); //HPバーを実装
let oldIndexX = 0;
let oldIndexY = 30;

/**
 * 呼び出す敵の初期位置と画像をセット
 *
 * @param {*} spawnPositionX 呼び出すx座標
 * @param {*} spawnPositionY 呼び出すy座標
 * @param {*} imgPath 敵の画像
 */
function callEnemy(spawnPositionX, spawnPositionY, imgPath){
    enemySpawnArray.push({location:null, x:spawnPositionX, y:spawnPositionY}); //引数の値をセット
    enemySpawn(imgPath);
}

/**
 * 敵を実際の画面に生成
 *
 * @param {*} imgPath 敵の画像
 */
function enemySpawn(imgPath){
    enemySpawnArray[enemySpawnArray.length - 1].location = document.createElement("img"); //敵の画像タグを生成
    enemySpawnArray[enemySpawnArray.length - 1].location.className = "enemy"; //引数のクラス名のpath
    enemySpawnArray[enemySpawnArray.length - 1].location.src = imgPath; //引数の画像のpath
    document.body.appendChild(enemySpawnArray[enemySpawnArray.length - 1].location); //bodyタグの子要素で生成した敵のタグを追加
    //弾のx座標の初期位置に発射した時点の自機の位置をセット
    enemySpawnArray[enemySpawnArray.length - 1].location.style.left =enemySpawnArray[enemySpawnArray.length - 1].x + "px"; //マップ上に初期位置の座標で表示
    enemySpawnArray[enemySpawnArray.length - 1].location.style.bottom = enemySpawnArray[enemySpawnArray.length - 1].y + "px";
}

let nowWave = 0; //敵の移動パターン
let tempMovingX = 0, tempMovingY = 0; //敵のマップ上の位置をリアルタイムで保持
let judgeVector = false; //敵が斜めに移動しているときの制御変数
let setTime = [];

/**
 * 敵を引数frame間隔で移動させる
 *
 * @param {*} mapIndexX 移動先の座標x 0 ~ 30
 * @param {*} mapIndexY 移動先の座標y 0 ~ 30
 * @param {*} frame 間隔
 */
function enemyMove(mapIndexX, mapIndexY, frame=100){
    /**
     * 現在のマップ上の位置と目的の位置を比較
     *
     * oldIndex : 現在のマップ上の位置 nowPosition / 30で与えられる
     * mapIndex : 目的のマップ上の位置
     */
    if(oldIndexX < mapIndexX && oldIndexY < mapIndexY){ //横 : 右、　縦 : 上
        enemySpawnArray[enemySpawnArray.length-1].x += toX/frame; //速度をframeで調整
        enemySpawnArray[enemySpawnArray.length-1].y += toY/frame;
        judgeVector = true;
    }else if(oldIndexX > mapIndexX && oldIndexY < mapIndexY){ //横 : 左、　縦 : 上
        enemySpawnArray[enemySpawnArray.length-1].x -= toX/frame;
        enemySpawnArray[enemySpawnArray.length-1].y += toY/frame;
        judgeVector = true;
    }else if(oldIndexX < mapIndexX && oldIndexY > mapIndexY){ //横 : 右、　縦 : 下
        enemySpawnArray[enemySpawnArray.length-1].x += toX/frame;
        enemySpawnArray[enemySpawnArray.length-1].y -= toY/frame;
        judgeVector = true;
    }else if(oldIndexX > mapIndexX && oldIndexY > mapIndexY){ //横 : 左、　縦 : 下　
        enemySpawnArray[enemySpawnArray.length-1].x -= toX/frame;
        enemySpawnArray[enemySpawnArray.length-1].y -= toY/frame;  //bottomだから値が大きい方が上になる
        judgeVector = true;
    }else if(oldIndexX > mapIndexX){ //左
        enemySpawnArray[enemySpawnArray.length-1].x -= toX/frame;
    }else if(oldIndexX < mapIndexX){ //右
        enemySpawnArray[enemySpawnArray.length-1].x += toX/frame;
    }else if(oldIndexY > mapIndexY){ //下
        enemySpawnArray[enemySpawnArray.length-1].y -= toY/frame;
    }else if(oldIndexY < mapIndexY){ //上
        enemySpawnArray[enemySpawnArray.length-1].y += toY/frame;
    }
    enemySpawnArray[enemySpawnArray.length - 1].location.style.left = enemySpawnArray[enemySpawnArray.length - 1].x + "px";
    enemySpawnArray[enemySpawnArray.length - 1].location.style.bottom = enemySpawnArray[enemySpawnArray.length - 1].y + "px";

    /**
     * 座標を更新
     * 実際のオブジェクトを移動
     */
    if(judgeVector){ //斜め移動の時
        tempMovingX = Math.round((Math.round((enemySpawnArray[enemySpawnArray.length-1].x + mapPosiX/2)/mapLength)));
        tempMovingY = Math.round((Math.round((enemySpawnArray[enemySpawnArray.length-1].y + mapPosiY/2)/mapLength)));
        judgeVector = false;
    }else{
        tempMovingX = Math.round((enemySpawnArray[enemySpawnArray.length-1].x + mapPosiX/2)/mapLength) - 2;
        tempMovingY = Math.round((enemySpawnArray[enemySpawnArray.length-1].y + mapPosiY/2)/mapLength);
    }
    console.log("x : "+tempMovingX);
    console.log("y : "+tempMovingY);

    //mapを更新
    mapObjection("BOSS", enemySpawnArray[enemySpawnArray.length - 1].x, enemySpawnArray[enemySpawnArray.length - 1].y)

    /**
     * 敵の現在のマップ上の位置と目的の位置を比較
     * 一致している時enemyMove関数を終了
     */
    if((tempMovingX >= mapIndexX - 1 && tempMovingX <= mapIndexX + 1) && tempMovingY == mapIndexY){
        clearTimeout(enemyMoveTimeouut); //コールバック関数を停止
        enemyMoveTimeouut = null;
        oldIndexX = mapIndexX; //敵の位置を目的の位置にセット
        oldIndexY = mapIndexY;
        setTimeout("controllMoving()", setTime[nowWave]);
        console.log("実行:"+nowWave);
        return;
    }

    //再帰
    enemyMoveTimeouut = setTimeout(function (){enemyMove(mapIndexX, mapIndexY, frame);}, 30);
}

/**
 * マップのデータを更新させる
 *
 * @param {*} obj 更新したいオブジェクト
 * @param {*} objX オブジェクトのx座標
 * @param {*} objY オブジェクトのy座標
 */
function mapObjection(obj, objX, objY){
    let indexX = Math.round(objX/mapLength);
    let indexY = Math.round(objY/mapLength);
    if(obj === "BOSS") map[indexX][indexY] = "BOSS";
    else if(obj === "player") map[indexX][indexY] = "player";
}