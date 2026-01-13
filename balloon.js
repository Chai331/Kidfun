let score=0;
let hearts=3;
let time=180;
let gameTimer, spawnTimer;

const colors=["red","blue","yellow","green","purple"];

function startGame(){
document.getElementById("startScreen").style.display="none";
document.getElementById("hud").style.display="flex";
document.getElementById("question").style.display="block";

gameTimer=setInterval(()=>{
time--;
document.getElementById("timer").innerText="⏰ "+time;
if(time<=0) endGame();
},1000);

spawnTimer=setInterval(spawnBalloon,800);
}

function spawnBalloon(){
let b=document.createElement("div");
let color=colors[Math.floor(Math.random()*colors.length)];
b.className="balloon";
b.style.background=color;
b.style.left=Math.random()*90+"%";

b.onclick=()=>{
if(color==="red"){
score+=10;
document.getElementById("score").innerText=score;
}else{
hearts--;
document.getElementById("hearts").innerText="❤️".repeat(hearts);
if(hearts<=0) endGame();
}
b.remove();
};

document.body.appendChild(b);
setTimeout(()=>b.remove(),7000);
}

function endGame(){
clearInterval(gameTimer);
clearInterval(spawnTimer);
document.querySelectorAll(".balloon").forEach(b=>b.remove());
document.getElementById("hud").style.display="none";
document.getElementById("question").style.display="none";
document.getElementById("endScreen").style.display="block";
document.getElementById("finalScore").innerText=score;
}
