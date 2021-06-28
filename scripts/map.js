const mapLength = 30;
let map = new Array(mapLength);
for(i=0; i<map.length; i++){
    map[i] = new Array(mapLength);
}

let mapPosiX = gameDisplayX / mapLength;
let mapPosiY = gameDisplayY / mapLength;
let toX, toY;

function getToMap(mapIndexX, mapIndexY){
    //進みたい方向の速度を定義.
    let addX = 0, addY = 0;
    if(judgeVector){
        if(Math.abs(oldIndexX - mapIndexX) - Math.abs(oldIndexY - mapIndexY) > 0){
            addX = Math.abs(mapIndexX/(mapIndexY - mapIndexX)*3);
        }
        if(Math.abs(oldIndexY - mapIndexY) - Math.abs(oldIndexX - mapIndexX) > 0) {
            addY = Math.abs(mapIndexY/(mapIndexX - mapIndexY)*3);
        }
    }

    toX = Math.round(Math.abs(mapPosiX*mapIndexX-mapPosiX/2)/mapLength + addX);
    toY = Math.round(Math.abs(mapPosiY*mapIndexY-mapPosiY/2)/mapLength + addY);
}
