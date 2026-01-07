let time=180,score=0,combo=0,timer;

function startGame(){
  startScreen.classList.add("hide");
  hud.classList.remove("hide");
  gameArea.classList.remove("hide");
  timer=setInterval(()=>{
    time--; timeSpan.innerText=time;
    if(time<=0) endGame();
  },1000);
  spawn();
}

const timeSpan=document.getElementById("time");
const scoreSpan=document.getElementById("score");

function spawn(){
  if(time<=0) return;
  createBalloon();
  setTimeout(spawn,2000);
}

function createBalloon(){
  let n=Math.floor(Math.random()*20)+1;
  let b=document.createElement("div");
  b.className="balloon";
  b.innerText=n;
  b.style.left=Math.random()*80+"%";
  gameArea.appendChild(b);

  b.onclick=()=>{
    if(n<=20){
      pop.play();
      combo++;
      let bonus=combo>=4?(combo-3)*10:0;
      score+=10+bonus;
      scoreSpan.innerText=score;
      b.remove();
    }else{
      wrong.play();
      combo=0;
    }
  };

  setTimeout(()=>b.remove(),14000);
}

function endGame(){
  clearInterval(timer);
  gameArea.innerHTML="";
  hud.classList.add("hide");
  endScreen.classList.remove("hide");
  resultText.innerText =
    score>=300?"Excellent! 🎉":
    score>=150?"Good! 😊":
    score>0?"Nice! 🙂":"Try Again! 😿";
}

