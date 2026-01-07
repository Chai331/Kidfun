let time=180, score=0, combo=0, answer=0, timer;

function startCountdown(){
  startScreen.style.display="none";
  countdownScreen.classList.remove("hide");
  let c=3;
  countNum.innerText=c;
  let cd=setInterval(()=>{
    c--;
    countNum.innerText=c>0?c:"GO!";
    if(c<0){
      clearInterval(cd);
      countdownScreen.classList.add("hide");
      startGame();
    }
  },1000);
}

function startGame(){
  gameArea.classList.remove("hide");
  newQuestion();
  timer=setInterval(()=>{
    time--;
    timeSpan.innerText=time;
    if(time<=0)endGame();
  },1000);
}

function newQuestion(){
  ball.classList.remove("fly");

  let a=Math.floor(Math.random()*10);
  let b=Math.floor(Math.random()*10);
  answer=a+b;
  question.innerText=a+" + "+b;

  let arr=[answer,answer+Math.floor(Math.random()*4+1),answer-Math.floor(Math.random()*4+1)];
  arr.sort(()=>Math.random()-.5);

  document.querySelectorAll(".hoop").forEach((h,i)=>{
    h.className="hoop";
    h.querySelector("span").innerText=arr[i];
    h.onclick=()=>throwBall(arr[i],h);
  });
}

function throwBall(val,hoop){
  ball.classList.add("fly");

  setTimeout(()=>{
    if(val==answer){
      good.play();
      combo++;
      score+=10+(combo>3?(combo-3)*10:0);
      scoreSpan.innerText=score;
      hoop.classList.add("good");
    }else{
      bad.play();
      combo=0;
      hoop.classList.add("bad");
    }
    setTimeout(newQuestion,500);
  },500);
}

function endGame(){
  clearInterval(timer);
  end.play();
  gameArea.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.innerText=score;
  finalText.innerText=score>=200?"Excellent! 🌟":score>=100?"Good! 😊":"Nice! 👍";
}
