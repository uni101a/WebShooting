/**
 * callEnemy()の引数
 *
 * x座標についての敵のスポーン位置
 * y座標についての敵のスポーン位置
 * 呼び出した敵のイメージパス
 */

/**
 * controllEnemyBullets()
 *
 * @param {*} ammunition 弾数
 * @param {*} count カウンタ
 * @param {*} imgPath 弾の画像
 * @param {*} bulletclass cssにおいての弾のクラス
 * @param {*} timeoutSpeed 弾の発射間隔,非同期関数movingEnemyBulletの呼び出し時間
 */

 /**
  * enemyMove()
  *
  * 移動するx
  * 移動するy
  * 何秒後に移動を止めるか
  * 弾の速度 1~20まで(基本は10)
  * 呼び出す間隔
  * 敵の弾の横の長さ/3 - 2(bullet1=5, bullet2=35, bullet3=?)
  *
  * setTimeoutの第二引数は実行から何秒後に弾を打ち出すか
  */

BOSS();


function BOSS(){
    let enemyBulletTimeout = [];
    callEnemy(gameDisplayX/2, gameDisplayY, objectImgSrc["Enemy_BOSS"]);//5500
    oldIndexX = Math.round((gameDisplayX/2)/mapLength) - 1;
    enemyBulletTimeout.push(setTimeout(function (){controllEnemyBullet(500, -1, bulletImgSrc["1"], "bullet", 5, 500, 5);}, 1000));
    enemyBulletTimeout.push(setTimeout(function (){controllEnemyBullet(500, -1, bulletImgSrc["2"], "bullet2", 5, 1000, 35);}, 1000));
    
    move(oldIndexX, 20, 5, 1000)

    controllMoving();
}

function move(x, y, frame, interval){
    setTime.push(interval);
    setMove(x, y, frame);
}

function controllMoving(){
    //moveListの要素を全て読み込んだら移動を終了
    if(nowWave == enemyMoveList.x.length){
        return;
    }
    getToMap(enemyMoveList.x[nowWave], enemyMoveList.y[nowWave]); //敵の移動する速度(方向)を取得
    enemyMove(enemyMoveList.x[nowWave], enemyMoveList.y[nowWave], enemyMoveList.frame[nowWave]); //move関数を呼び出す
    nowWave++;
}

/**
 * 敵の移動する情報をセットする
 *
 * @param {*} x x座標の位置
 * @param {*} y y座標の位置
 * @param {*} frame 間隔
 */
function setMove(x, y, frame){
    //enemyMoveListはloadDataの4行目で宣言
    enemyMoveList.x.push(x);
    enemyMoveList.y.push(y);
    enemyMoveList.frame.push(frame);
}

function setMoveTime(time){
    setTime.push(time);
}