let item = [];
let itemMoveTimeout = null;

itemSpawn(itemImgSrc["maguro"], true);
if(itemMoveTimeout == null) itemMoveTimeout = itemMove();

function itemSpawn(imgPath){
    item.push({location:null, x:0, y:0});
    item[item.length - 1].x = (Math.random()*(0.9-0.05)+0.05) * gameDisplayX;
    item[item.length - 1].y = (Math.random()*(1-0.8)+0.8) * gameDisplayY;
    item[item.length - 1].location = document.createElement("img");
    item[item.length - 1].location.className = "item";
    item[item.length - 1].location.src = imgPath;
    document.body.appendChild(item[item.length - 1].location);
    item[item.length - 1].location.style.left = item[item.length - 1].x + "px";
    item[item.length - 1].location.style.bottom = item[item.length - 1].y + "px";
    item[item.length - 1].location.style.width = "5%";
    item[item.length - 1].location.style.height = "5%";

    setTimeout(function(){itemSpawn(itemImgSrc["maguro"]);}, 5000);
}

function itemMove(){
    itemMaxCount = item.length - 1;
    for(let count = itemMaxCount; count >= 0; count--){
        item[count].y -= 5;
        item[count].location.style.bottom = item[count].y + "px";

        if((item[count].y <= player.ownPosition.y + mapLength && item[count].y >= player.ownPosition.y - mapLength) &&
        (item[count].x <= player.ownPosition.x + mapLength && item[count].x >= player.ownPosition.x - mapLength)){
            document.body.removeChild(item[count].location);
            item.splice(count, 1);
            if(bulletPower < 100){
                bulletPower ++;
            }else{
                pointValue += 1000;
                point.innerHTML = pointValue;
                if(pointValue > highScoreValue){
                    highScoreValue = pointValue;
                    highScore.textContent = highScoreValue;
                }
            }
            power.innerHTML = bulletPower;
            continue;
        }

        if(item[count].y <= 0){
            document.body.removeChild(item[count].location);
            item.splice(count, 1);
        }
    }
    itemMoveTimeout = setTimeout("itemMove()", 50);
}