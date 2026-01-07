let time=180, score=0, combo=0, timer;

const timeSpan=document.getElementById("time");
const scoreSpan=document.getElementById("score");
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

  spawnBalloon();
}

function spawnBalloon(){
  if(time<=0) return;

  createBalloon();
  setTimeout(spawnBalloon,1800);
}

function createBalloon(){
  let number=Math.floor(Math.random()*20)+1;

  const b=document.createElement("div");
  b.className="balloon";
  b.innerText=number;
  b.style.left=Math.random()*85+"%";
  gameArea.appendChild(b);

  b.onclick=()=>{
    document.getElementById("pop").play();
    combo++;

    let bonus=combo>=4?(combo-3)*10:0;
    score+=10+bonus;
    scoreSpan.innerText=score;
    b.remove();
  };

  setTimeout(()=>b.remove(),12000);
}

function endGame(){
  clearInterval(timer);
  gameArea.innerHTML="";
  hud.classList.add("hide");
  endScreen.classList.remove("hide");

  document.getElementById("resultText").innerText=
    score>=300?"Excellent! 🎉":
    score>=150?"Good! 😊":
    score>0?"Nice! 🙂":"Try Again! 😿";
}
