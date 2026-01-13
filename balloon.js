let score=0, lives=3, time=180;
const colors=["red","blue","yellow","green"];

function startGame(){
  document.getElementById("startScreen").style.display="none";
  document.getElementById("question").innerText="POP THE RED BALLOON";
  spawnLoop=setInterval(spawnBalloon,800);
  timer=setInterval(()=>{
    time--;
    document.getElementById("time").innerText=time;
    if(time<=0||lives<=0) endGame();
  },1000);
}

function spawnBalloon(){
  let color=colors[Math.floor(Math.random()*colors.length)];
  let b=document.createElement("div");
  b.className="balloon";
  b.innerText="🎈";
  b.style.left=Math.random()*90+"%";
  b.style.color=color;

  b.onclick=()=>{
    if(color=="red"){
      score+=10;
      document.getElementById("score").innerText="Score: "+score;
    }else{
      lives--;
      document.getElementById("hearts").innerText="❤️".repeat(lives);
      if(lives<=0) endGame();
    }
    b.remove();
  };

  document.getElementById("gameArea").appendChild(b);
  setTimeout(()=>b.remove(),6000);
}

function endGame(){
  clearInterval(spawnLoop);
  clearInterval(timer);
  document.getElementById("endScreen").style.display="flex";
  document.getElementById("finalScore").innerText="Your Score: "+score;
}
 
