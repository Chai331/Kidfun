const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const hud = document.getElementById("hud");
const gameArea = document.getElementById("gameArea");

const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const lifeText = document.getElementById("life");
const finalScore = document.getElementById("finalScore");
const startBtn = document.getElementById("startBtn");

let score = 0;
let time = 180;
let life = 3;
let timer;
let gameRunning = false;

startBtn.onclick = startGame;

function startGame(){
  score = 0;
  time = 180;
  life = 3;
  gameRunning = true;

  scoreText.innerText = score;
  timeText.innerText = time;
  lifeText.innerText = "❤️❤️❤️";

  startScreen.classList.add("hide");
  endScreen.classList.add("hide");
  hud.classList.remove("hide");

  timer = setInterval(()=>{
    time--;
    timeText.innerText = time;
    if(time <= 0) endGame();
  },1000);

  spawnBalloon();
}

function spawnBalloon(){
  if(!gameRunning) return;

  const colors = ["red","blue","green","yellow","pink"];
  const balloon = document.createElement("div");
  const color = colors[Math.floor(Math.random()*colors.length)];

  balloon.className = "balloon " + color;
  balloon.style.left = Math.random()*90 + "%";

  balloon.onclick = ()=>{
    if(color === "red"){
      score += 10;
      scoreText.innerText = score;
    }else{
      life--;
      lifeText.innerText = "❤️".repeat(life);
      if(life <= 0){
        endGame();
        return;
      }
    }
    balloon.remove();
  };

  gameArea.appendChild(balloon);

  setTimeout(()=>balloon.remove(),8000);
  setTimeout(spawnBalloon,700);
}

function endGame(){
  gameRunning = false;
  clearInterval(timer);
  gameArea.innerHTML = "";

  hud.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.innerText = score;
}
