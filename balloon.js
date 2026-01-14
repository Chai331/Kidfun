let score=0, hearts=3, time=180, playing=false;
const colors=["red","blue","yellow","green","pink"];

function startGame(){
  document.getElementById("startScreen").style.display="none";
  playing=true;
  spawnLoop();
  timerLoop();
}

function spawnLoop(){
  if(!playing) return;
  createBalloon();
  setTimeout(spawnLoop,700);
}

function createBalloon(){
  let b=document.createElement("div");
  let c=colors[Math.floor(Math.random()*colors.length)];
  b.className="balloon "+c;
  b.style.left=Math.random()*90+"%";
  b.onclick=()=>hit(c,b);
  gameArea.appendChild(b);
  setTimeout(()=>b.remove(),8000);
}

function hit(color,b){
  b.remove();
  if(color=="red"){
    score+=10;
  }else{
    hearts--;
  }
  updateHUD();
  if(hearts<=0) endGame();
}

function timerLoop(){
  let t=setInterval(()=>{
    if(!playing){clearInterval(t);return;}
    time--;
    updateHUD();
    if(time<=0) endGame();
  },1000);
}

function updateHUD(){
  scoreDiv.innerText="Score: "+score;
  heartsDiv.innerText="❤️".repeat(hearts);
  timeDiv.innerText=time;
}

function endGame(){
  playing=false;
  gameArea.innerHTML="";
  gameOver.classList.remove("hide");
  finalScore.innerText="Your Score: "+score;
}

const scoreDiv=document.getElementById("score");
const heartsDiv=document.getElementById("hearts");
const timeDiv=document.getElementById("time");
