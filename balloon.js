let score=0,lives=3,time=180;
let spawnLoop,timer;

const colors=["red","blue","yellow","green","purple","orange"];

const popSound=document.getElementById("popSound");
const wrongSound=document.getElementById("wrongSound");

function playPop(){
  popSound.currentTime=0;
  popSound.play();
}
function playWrong(){
  wrongSound.currentTime=0;
  wrongSound.play();
}

function startGame(){
  playPop();
  document.getElementById("startScreen").style.display="none";
  document.getElementById("colorGuide").style.display="flex";
}

function closeGuide(){
  playPop();
  document.getElementById("colorGuide").style.display="none";
  score=0; lives=3; time=180;
  updateUI();

  spawnLoop=setInterval(spawnBalloon,900);
  timer=setInterval(()=>{
    time--;
    document.getElementById("time").innerText=time;
    if(time<=0||lives<=0) endGame();
  },1000);
}

function updateUI(){
  document.getElementById("score").innerText="Score: "+score;
  document.getElementById("hearts").innerText="❤️".repeat(lives);
  document.getElementById("time").innerText=time;
}

function spawnBalloon(){
  const color=colors[Math.floor(Math.random()*colors.length)];
  const b=document.createElement("div");
  b.className="balloon "+color;
  b.style.left=Math.random()*90+"%";

  b.onclick=()=>{
    if(color==="red"){
      score+=10;
      playPop();
    }else{
      lives--;
      playWrong();
    }
    updateUI();
    b.remove();
    if(lives<=0) endGame();
  };

  document.getElementById("gameArea").appendChild(b);
  setTimeout(()=>b.remove(),7000);
}

function endGame(){
  clearInterval(spawnLoop);
  clearInterval(timer);
  document.getElementById("finalScore").innerText="Your Score: "+score;
  document.getElementById("endScreen").style.display="flex";
}
