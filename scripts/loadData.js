/*<----------loadData---------->*/
let preloadImg;

let enemyMoveList = {x:[], y:[], frame:[]};

//""はプレイヤーの弾
let bulletImgList = ["", "1", "2", "3", "4"];
let bulletImgList_loadCheck = 0
let bulletImgSrc = {};
for (let count = 0; count < bulletImgList.length; count++){
    preloadImg = document.createElement('img');
    bulletImgSrc[ bulletImgList[count] ] = './imgs/bullets/bullet'+ bulletImgList[count]+'.png';
    preloadImg.src = bulletImgSrc[ bulletImgList[count] ];
    preloadImg.addEventListener("load", function(){++bulletImgList_loadCheck});
}

let objectImgList = ["Enemy_BOSS", "bakuhatsu"];
let objectImgList_loadCheck = 0
let objectImgSrc = {};
for (let count = 0; count < objectImgList.length; count++){
    preloadImg = document.createElement('img');
    objectImgSrc[ objectImgList[count] ] = './imgs/objects/'+ objectImgList[count]+'.png';
    preloadImg.src = objectImgSrc[ objectImgList[count] ];
    preloadImg.addEventListener("load", function(){++objectImgList_loadCheck});
}

let itemImgList = ["maguro"];
let itemImgList_loadCheck = 0
let itemImgSrc = {};
for (let count = 0; count < itemImgList.length; count++){
    preloadImg = document.createElement('img');
    itemImgSrc[ itemImgList[count] ] = './imgs/items/'+ itemImgList[count]+'.png';
    preloadImg.src = itemImgSrc[ itemImgList[count] ];
    preloadImg.addEventListener("load", function(){++itemImgList_loadCheck});
}

//------------------------------BGM-----------------------------------

/*
//BGM,SEのファイル名を格納
let bgmList = ["BGM1.mp3"];
let seList = ["bomb.mp3", "shoot1.mp3"];

//一時的にファイルのパスをデータに持つ変数
let sound_temp;

//用意したBGM分プリロードを行う
for(let count = 0; count < bgmList.length; count++){
    sound_temp = "./data_bgm_se/" + bgmList[count];
    //audioオブジェクトを生成
    bgmList[count] = new Audio();
    //audioタグのパスを指定
    bgmList[count].src = sound_temp;
    //再生
    bgmList[count].load();
    //再生止め
    muted(bgmList[count]);
}

for(let count = 0; count < seList.length; count++){
    sound_temp = "./data_bgm_se/" + seList[count];
    seList[count] = new Audio();
    seList[count].src = sound_temp;
    seList[count].load();
    muted(seList[count]);
}

//BGMを再生したいとき呼び出す
function loadBGM(path, num){
    let src = "./data_bgm_se/" + path + ".mp3";
    bgmList[num].src = src;
    bgmList[num].play();
}

function loadSE(path, num){
    seList[num].src = "./data_bgm_se/" + path + ".mp3";
    console.log(seList[num]);
    seList[num].play();
}

function muted(tag){
    if(tag.muted){
        tag.muted = false;
    }else{
        tag.muted = true;
    }
}
*/
//---------------------------------------------------------------------


let highScore = document.getElementById("highScore");
let highScoreValue = 0;

highScoreValue = localStorage.getItem('key');

if(highScoreValue != 0){
    highScore.textContent = highScoreValue;
}


function saveHighScore(){
    localStorage.setItem('key', highScoreValue);
}