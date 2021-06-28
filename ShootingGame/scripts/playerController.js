/**
 * @key ownPosition:自機の現在の二次元座標
 * @key inputMoveKey:キー入力から動きを評価
 */
let player = {ownPosition:{x:0,y:0}, inputMoveKey:{up:false,down:false,left:false,right:false}, shift:false, enter:false};//keyeventを呼び出すための宣言
document.onkeydown = onkeydown;
document.onkeyup = onkeyup;
let moveTimeout = null;
let fireTimeout = null;

let bulletPower = 1;
let pointValue = 0;
let power = document.getElementById("power");
let point = document.getElementById("point");
/**
* 自機の操作をwasd,方向キーで行う
*/
function onkeydown(){
   switch (event.key) {
       case "w": //上
       case "W":
           player.inputMoveKey.up = true;
           break;

       case "a": //左
       case "A":
           player.inputMoveKey.left = true;
           break;

       case "s": //下
       case "S":
           player.inputMoveKey.down = true;
           break;

       case "d": //右
       case "D":
           player.inputMoveKey.right = true;
           break;

       case "Shift": //減速
           if(player.shift){
               player.shift = false;
           }else player.shift = true;
           break;

       case "Enter": //発射
           player.enter = true;
           break;

       default:
           break;
   }
   if(moveTimeout == null && (player.inputMoveKey.down == true || player.inputMoveKey.left == true || player.inputMoveKey.up == true || player.inputMoveKey.right == true)){
       moveTimeout = setTimeout("moving()", 30);
   }
   if(fireTimeout == null && player.enter == true) fireTimeout = setTimeout("controllPlayerBullet()", 80);
}

function onkeyup(){
   switch (event.key) {
       case "w":
       case "W":
           player.inputMoveKey.up = false;
           break;

       case "a":
       case "A":
           player.inputMoveKey.left = false;
           break;

       case "s":
       case "S":
           player.inputMoveKey.down = false;
           break;

       case "d":
       case "D":
           player.inputMoveKey.right = false;
           break;

       case "Enter":
           player.enter = false;
           break;

       default:
           break;
   }
   //全てキーが離されたら移動する関数の実行を止める
   if(player.inputMoveKey.up == true || player.inputMoveKey.down == true || player.inputMoveKey.left == true || player.inputMoveKey.right == true ){
   }else{
       clearTimeout(moveTimeout);
       moveTimeout = null;
   }
   if(player.enter == false){
       clearTimeout(fireTimeout);
       fireTimeout = null;
   }
}

function gameOver(){
   saveHighScore();
   alert("敗北者");
   location.reload();
}