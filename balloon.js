let score=0,lives=3,time=180;
let spawnLoop,timer;

const colors=["red","blue","yellow","green","purple","orange"];

function startGame(){
  document.getElementById("startScreen").style.display="none";
  document.getElementById("colorGuide").style.display="flex";
}

function closeGuide(){
  document.getElementById("colorGuide").style.display="none";
  score=0; lives=3; time=180;
  updateUI();

  spawnLoop=setInterval(spawnBalloon,800);
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
  b.className="balloon";
  b.style.left=Math.random()*90+"%";
  b.style.setProperty("--c", color);

  // REAL BALLOON
  b.innerHTML = '<div class="balloonBody"></div><div class="balloonString"></div>';

  b.onclick=()=>{
    if(color==="red") score+=10;
    else lives--;
    updateUI();
    b.remove();
    if(lives<=0) endGame();
  };

  document.getElementById("gameArea").appendChild(b);
  setTimeout(()=>b.remove(),6000);
}

function endGame(){
  clearInterval(spawnLoop);
  clearInterval(timer);
  document.getElementById("finalScore").innerText="Your Score: "+score;
  document.getElementById("endScreen").style.display="flex";
}
