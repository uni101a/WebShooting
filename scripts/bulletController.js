//弾を生成したとき一時的に保存するための配列
let playerBulletArray = [];
let playerBulletTimeout;

let enemyBulletArray = [];
let enemyBulletTimeout;
let enemyControllBulletTimeout;

let v0X = [];
let v0Y = [];

const hp = document.getElementsByClassName("hp");
const bossHP = document.getElementById("bossHP");

/*
const playerWidth = document.getElementById("pc-player").style.width;//=50px
const playerHeigth = document.getElementById("pc-player").style.Heigth;//=50px
const bulletWidth = document.getElementsByClassName("bullet").style.width;//=15px;
const bulletHeight = document.getElementsByClassName("bullet").style.Height;//=15px;
*/

function controllPlayerBullet(){
    playerBulletArray.push({location:null, x:0, y:0});
    definePlayerBullet(bulletImgSrc[""]);
    if(playerBulletTimeout == null) playerBulletTimeout = movingPlayerBullet(15);
    fireTimeout = setTimeout("controllPlayerBullet()", 80);
}

/**
 * @param {*} ammunition 弾数
 * @param {*} count カウンタ
 * @param {*} imgPath 弾の画像
 * @param {*} bulletclass cssにおいての弾のクラス
 * @param {*} timeoutSpeed 弾の発射間隔,非同期関数movingEnemyBulletの呼び出し時間
 */
function controllEnemyBullet(ammunition, count, imgPath, bulletclass, bulletSpeed, timeoutSpeed, checkX){
    count ++;
    enemyBulletArray.push({location:null, x:0, y:0});
    defineEnemyBullet(imgPath, bulletclass);
    trackedPlayerPosition(bulletSpeed);

    if(enemyBulletTimeout == null) enemyBulletTimeout = movingEnemyBullet(checkX);
    if(count + 1 == ammunition) return;
    enemyControllBulletTimeout = setTimeout(function(){controllEnemyBullet(ammunition, count, imgPath, bulletclass, bulletSpeed, timeoutSpeed, checkX);}, timeoutSpeed);
}



//<-----------Player----------->

/**
 * 弾を生成する関数
 * html,cssに生成した弾をセット
 */
function definePlayerBullet(imgPath){
    playerBulletArray[playerBulletArray.length - 1].location = document.createElement("img");
    playerBulletArray[playerBulletArray.length - 1].location.className = "bullet";
    playerBulletArray[playerBulletArray.length - 1].location.src = imgPath;
    document.body.appendChild(playerBulletArray[playerBulletArray.length - 1].location);
    playerBulletArray[playerBulletArray.length - 1].x = player.ownPosition.x + 20;
    playerBulletArray[playerBulletArray.length - 1].y = player.ownPosition.y + 30;
    playerBulletArray[playerBulletArray.length - 1].location.style.left = playerBulletArray[playerBulletArray.length - 1].x + "px";
    playerBulletArray[playerBulletArray.length - 1].location.style.bottom = playerBulletArray[playerBulletArray.length - 1].y + "px";
}

let isHit = false;
/**
 * 生成した弾を移動する関数
 * 弾のy座標の初期位置に発射した時点の自機の位置+speedの値をセット
 */
function movingPlayerBullet(speed){
    bulletCountMax = playerBulletArray.length - 1;
    for(let count = bulletCountMax; count >= 0; count--){
        playerBulletArray[count].y += speed;
        playerBulletArray[count].location.style.bottom = playerBulletArray[count].y + "px";

        if(bulletCheck(count)){
            document.body.removeChild(playerBulletArray[count].location);
            playerBulletArray.splice(count, 1);

            if(!isHit) break;
            console.log("当たった！");

            item.push({location:null, x:0, y:0});
            item[item.length - 1].location = document.createElement("img");
            item[item.length - 1].location.className = "bakuhatu";
            item[item.length - 1].location.src = "imgs/objects/" + objectImgList[1] + ".png";
            document.body.appendChild(item[item.length - 1].location);
            item[item.length - 1].location.style.left = 20 + enemySpawnArray[enemySpawnArray.length-1].x + "px";
            item[item.length - 1].location.style.bottom = enemySpawnArray[enemySpawnArray.length-1].y + "px";
            item[item.length - 1].location.style.width = "5%";
            item[item.length - 1].location.style.height = "10%";
        }
        isHit = false;
    }
    if(playerBulletArray.length == 0) {
        clearTimeout(playerBulletTimeout);
        playerBulletTimeout = null;
        return;
    }
    playerBulletTimeout = setTimeout(function (){movingPlayerBullet(speed);}, 20);
}
function bulletCheck(count){
    if(playerBulletArray[count].y >= gameDisplayY - 10) return true;

    else if(playerBulletArray[count].y >= enemySpawnArray[0].y &&
        (playerBulletArray[count].x - 110 <= enemySpawnArray[0].x && playerBulletArray[count].x + 15 >= enemySpawnArray[0].x)) {
            isHit = true;
            let addPower;
            pointValue += bulletPower;
            point.innerHTML = pointValue;
            if(pointValue > highScoreValue){
                highScoreValue = pointValue;
                highScore.textContent = highScoreValue;
            }

            addPower = Math.abs(70 - (playerBulletArray[count].x - enemySpawnArray[0].x));
            if(addPower > 45){
                addPower = Math.abs(15 - (enemySpawnArray[0].x - playerBulletArray[count].x));
            }
            bossHP.value -= ((bulletPower+addPower*2)/50) + 2;
            bossHPText[1].textContent = Math.round(bossHP.value);

            return true;
        }

    return false;
}


//<-----------Enemy----------->

function defineEnemyBullet(imgPath, bulletclass){
    enemyBulletArray[enemyBulletArray.length - 1].location = document.createElement("img");
    enemyBulletArray[enemyBulletArray.length - 1].location.className = bulletclass; //引数のクラス名のpath
    enemyBulletArray[enemyBulletArray.length - 1].location.src = imgPath; //引数の画像のpath
    document.body.appendChild(enemyBulletArray[enemyBulletArray.length - 1].location);
    enemyBulletArray[enemyBulletArray.length - 1].x = enemySpawnArray[enemySpawnArray.length - 1].x + 20;
    enemyBulletArray[enemyBulletArray.length - 1].y = enemySpawnArray[enemySpawnArray.length - 1].y + 30;
    //弾のx座標の初期位置に発射した時点の自機の位置をセット
    enemyBulletArray[enemyBulletArray.length - 1].location.style.left = enemyBulletArray[enemyBulletArray.length - 1].x + "px";
    enemyBulletArray[enemyBulletArray.length - 1].location.style.bottom = enemyBulletArray[enemyBulletArray.length - 1].y + "px";
}

function movingEnemyBullet(checkX){
    bulletCountMaxEnemy = enemyBulletArray.length - 1;
    for(let count = bulletCountMaxEnemy; count >= 0; count--){
        enemyBulletArray[count].x -= v0X[count];
        enemyBulletArray[count].y -= v0Y[count];
        enemyBulletArray[count].location.style.left = enemyBulletArray[count].x + "px";
        enemyBulletArray[count].location.style.bottom = enemyBulletArray[count].y + "px";

        if(enemyBulletCheck(count,checkX)){
            document.body.removeChild(enemyBulletArray[count].location);
            enemyBulletArray.splice(count, 1);
            v0X.splice(count, 1);
            v0Y.splice(count, 1);
        }
    }
    if(enemyBulletArray.length == 0) {
        clearTimeout(enemyBulletTimeout);
        enemyBulletTimeout = null;
        return;
    }
    enemyBulletTimeout = setTimeout(function (){movingEnemyBullet(checkX);}, 30);
}

function enemyBulletCheck(count, checkX){
    if((enemyBulletArray[count].y -30 <= player.ownPosition.y && enemyBulletArray[count].y +30 >= player.ownPosition.y) &&
    (enemyBulletArray[count].x -50 <= player.ownPosition.x && enemyBulletArray[count].x + checkX >= player.ownPosition.x)){
        hp[hp.length-1].parentNode.removeChild(hp[hp.length-1]);
        if(hp.length == 0){
            console.log("gameOver");
            gameOver();
        }
        return true;
    }

    else if(enemyBulletArray[count].y >= gameDisplayY || enemyBulletArray[count].y <= 0||
    enemyBulletArray[count].x >= gameDisplayX || enemyBulletArray[count].x <= 0) return true;

    return false;
}

//<-------------敵の弾の軌道-------------->

function trackedPlayerPosition(bulletSpeed){
    let distanceX = (enemySpawnArray[enemySpawnArray.length - 1].x - player.ownPosition.x) / 10;
    let distanceY = (enemyBulletArray[enemyBulletArray.length - 1].y - player.ownPosition.y) / 10;
    v0X.push(distanceX*bulletSpeed / Math.sqrt((distanceX*distanceX)+(distanceY*distanceY)));
    v0Y.push(distanceY*bulletSpeed / Math.sqrt((distanceX*distanceX)+(distanceY*distanceY)));
}