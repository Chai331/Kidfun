const startScreen = document.getElementById("startScreen");
const cd = document.getElementById("countdown");
const game = document.getElementById("game");

const timeBox = document.getElementById("time");
const scoreBox = document.getElementById("score");
const comboBox = document.getElementById("combo");
const ball = document.getElementById("ball");
const hoops = document.querySelectorAll(".hoop");

let time = 300;
let score = 0;
let combo = 0;
let correctStreak = 0;
let timer;

function startGame(){
  startScreen.style.display="none";
  cd.style.display="flex";
  let n=3;
  cd.innerText=n;
  let t = setInterval(()=>{
    n--;
    if(n==0){
      clearInterval(t);
      cd.style.display="none";
      game.style.display="block";
      startTimer();
      newQuestion();
    }else cd.innerText=n;
  },1000);
}

function startTimer(){
  timer = setInterval(()=>{
    time--;
    timeBox.innerText=time;
    if(time<=0){
      clearInterval(timer);
      alert("Game Over!\nYour Score: "+score);
      location.reload();
    }
  },1000);
}

function newQuestion(){
  let a = Math.floor(Math.random()*5)+1;
  let b = Math.floor(Math.random()*5)+1;
  let ans = a+b;
  ball.innerText = a+" + "+b;

  let opts = [ans, ans+1, ans-1];
  opts.sort(()=>Math.random()-0.5);

  hoops.forEach((h,i)=>{
    h.innerText = opts[i];
    h.dataset.correct = opts[i]==ans;
  });
}

function choose(i){
  if(hoops[i].dataset.correct=="true"){
    correctStreak++;

    let gain = 10;
    if(correctStreak>=4){
      combo = (correctStreak-3)*10;
      gain += combo;
      comboBox.innerText = "🔥 COMBO +" + combo;
    }else comboBox.innerText="";

    score += gain;
    scoreBox.innerText=score;
  }else{
    correctStreak = 0;
    combo = 0;
    comboBox.innerText="";
  }
  newQuestion();
}
