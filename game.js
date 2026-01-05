let session=1,q=0,firstTry=true;
let stars=0;

const s1=[
 {q:"🐱",a:"Cat",opts:["Cat","Dog","Cow"]},
 {q:"🐶",a:"Dog",opts:["Dog","Cow","Cat"]},
 {q:"🐮",a:"Cow",opts:["Cow","Dog","Cat"]}
];

const s2=[
 {q:"Which food does this animal eat?",animal:"🐵",a:"🍌",opts:["🍌","🥕","🦴"]},
 {q:"Which food does this animal eat?",animal:"🐰",a:"🥕",opts:["🥕","🍎","🍌"]},
 {q:"Which food does this animal eat?",animal:"🐶",a:"🦴",opts:["🍗","🦴","🥕"]}
];

const s3=[
 {q:"Listen and choose the animal",a:"🐱",sound:"cat.mp3",opts:["🐱","🐶","🐮"]},
 {q:"Listen and choose the animal",a:"🐶",sound:"dog.mp3",opts:["🐶","🐱","🐮"]},
 {q:"Listen and choose the animal",a:"🐮",sound:"cow.mp3",opts:["🐮","🐱","🐶"]}
];

function startGame(){
 startScreen.classList.add("hide");
 gameArea.classList.remove("hide");
 loadSession();
}

function quitGame(){
 location.href="index.html";
}

function fillStar(n){
 document.getElementById("s"+n).innerHTML="🌟";
 document.getElementById("s"+n).classList.add("starFill");
 stars++;
}

function loadSession(){
 q=0; firstTry=true;
 sessionTitle.innerText="SESSION "+session;
 loadQuestion();
}

function loadQuestion(){
 options.innerHTML="";
 progress.innerText=(q+1)+"/3";
 let data=[null,s1,s2,s3][session][q];

 if(session==1){
   question.innerHTML=`<div style="font-size:150px">${data.q}</div>
   <div style="font-size:34px;color:#ff6f00;font-weight:900">What animal is it?</div>`;
 }

 if(session==2){
   question.innerHTML=`<div style="font-size:130px">${data.animal}</div>
   <div style="font-size:30px">${data.q}</div>`;
 }

 if(session==3){
   question.innerHTML=`<div style="font-size:110px">🔊</div>
   <div style="font-size:30px">${data.q}</div>`;
   new Audio(data.sound).play();
 }

 shuffle(data.opts).forEach(o=>{
   makeBtn(o,o==data.a);
 });
}

function makeBtn(txt,correct){
 let b=document.createElement("div");
 b.className="opt";
 b.innerText=txt;
 b.onclick=()=>{
   if(correct){
     correctSnd.play();
     b.classList.add("correct");
     q++;
     if(q==3){
       if(firstTry) fillStar(session);
       session++;
       if(session==4){ showResult(); return;}
       setTimeout(loadSession,1200);
     }else setTimeout(loadQuestion,800);
   }else{
     wrongSnd.play();
     b.classList.add("wrong");
     firstTry=false;
   }
 }
 options.appendChild(b);
}

function showResult(){
 gameArea.classList.add("hide");
 resultScreen.classList.remove("hide");
 congratsSnd.play();

 let msg="Try Again!";
 if(stars==1) msg="Nice!";
 if(stars==2) msg="Good!";
 if(stars==3) msg="Excellent!";

 resultText.innerText=msg;
 resultStars.innerHTML="🌟".repeat(stars);
}

function shuffle(a){return a.sort(()=>Math.random()-.5);}

