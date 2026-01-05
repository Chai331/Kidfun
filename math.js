let time=300, score=0, combo=0, answer=0, timer;

function startGame(){
  document.getElementById("startScreen").classList.add("hide");
  document.getElementById("gameScreen").classList.remove("hide");

  let c=3;
  ball.innerText="START IN "+c;
  let cd=setInterval(()=>{
    c--;
    if(c==0){
      clearInterval(cd);
      nextQ();
      timer=setInterval(count,1000);
    }else ball.innerText="START IN "+c;
  },1000);
}

function count(){
  time--;
  time<=0 && endGame();
  document.getElementById("time").innerText=time;
}

function endGame(){
  clearInterval(timer);
  ball.innerText="GAME OVER!";
  hoops.innerHTML="";
}

function nextQ(){
  let a=Math.floor(Math.random()*10);
  let b=Math.floor(Math.random()*10);
  answer=a+b;
  ball.innerText=`${a} + ${b} = ?`;

  let opts=[answer];
  while(opts.length<3){
    let r=answer + Math.floor(Math.random()*7)-3;
    if(r>=0 && !opts.includes(r)) opts.push(r);
  }
  opts.sort(()=>Math.random()-0.5);

  document.querySelectorAll(".hoop").forEach((h,i)=>h.innerText=opts[i]);
}

function choose(el){
  if(time<=0) return;
  let v=parseInt(el.innerText);
  if(v==answer){
    combo++;
    let bonus= combo>3 ? (combo-3)*10 : 0;
    score += 10 + bonus;
  }else{
    combo=0;
  }
  document.getElementById("score").innerText=score;
  document.getElementById("combo").innerText=combo;
  nextQ();
}
