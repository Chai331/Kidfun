let time=180, score=0, life=3, timer;
const colors=["red","blue","green","yellow","pink"];
let target="red";

const timeSpan=document.getElementById("time");
const scoreSpan=document.getElementById("score");
const lifeDiv=document.getElementById("life");
const gameArea=document.getElementById("gameArea");

function startGame(){
  startScreen.classList.add("hide");
  hud.classList.remove("hide");
  gameArea.classList.remove("hide");

  timer=setInterval(()=>{
    time--;
    timeSpan.innerText=time;
    if(time<=0) endGame();
  },1000);

  spawn();
}

function spawn(){
  if(time<=0 || life<=0) return;
  createBalloon();
  setTimeout(spawn,900);
}

function createBalloon(){
  const c=colors[Math.floor(Math.random()*colors.length)];
  const b=document.createElement("div");
  b.className="balloon "+c;
  b.style.left=Math.random()*85+"%";
  gameArea.appendChild(b);

  b.onclick=()=>{
    if(c===target){
      document.getElementById("pop").play();
      score+=10;
      scoreSpan.innerText=score;
    }else{
      document.getElementById("wrong").play();
      life--;
      lifeDiv.innerText="❤️".repeat(life);
      if(life<=0) endGame();
    }
    b.remove();
  };

  setTimeout(()=>b.remove(),10000);
}

function endGame(){
  clearInterval(timer);
  gameArea.innerHTML="";
  hud.classList.add("hide");
  endScreen.classList.remove("hide");
  document.getElementById("resultText").innerText=
    score>=200?"Excellent! 🎉":
    score>=100?"Good Job 😊":
    score>0?"Nice 🙂":"Try Again 😿";
}
