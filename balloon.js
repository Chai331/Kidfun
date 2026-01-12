const gameArea = document.getElementById("gameArea");
const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const hud = document.getElementById("hud");

const scoreBox = document.getElementById("score");
const timeBox = document.getElementById("time");
const lifeBox = document.getElementById("life");
const finalScore = document.getElementById("finalScore");

let score = 0;
let time = 180;
let life = 3;
let timer;

function startGame(){
  startScreen.classList.add("hide");
  hud.classList.remove("hide");
  spawnBalloon();
  timer = setInterval(()=>{
    time--;
    timeBox.innerText = time;
    if(time<=0) endGame();
  },1000);
}

function spawnBalloon(){
  const colors=["red","blue","green","yellow","pink"];
  const b=document.createElement("div");
  const color=colors[Math.floor(Math.random()*colors.length)];
  b.className="balloon "+color;
  b.style.left=Math.random()*90+"%";

  b.onclick=()=>{
    if(color=="red"){
      score+=10;
      scoreBox.innerText=score;
    }else{
      life--;
      lifeBox.innerText="❤️".repeat(life);
      if(life<=0){ endGame(); return; }
    }
    b.remove();
  };

  gameArea.appendChild(b);
  setTimeout(()=>b.remove(),9000);
  if(time>0) setTimeout(spawnBalloon,700);
}

function endGame(){
  clearInterval(timer);
  gameArea.innerHTML="";
  hud.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.innerText = score;
}
