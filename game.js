let session=1,q=0,firstTry=true;

const s1=[
 {q:"🐱",a:"🐱"},
 {q:"🐶",a:"🐶"},
 {q:"🐮",a:"🐮"}
];

const s2=[
 {q:"🐵",a:"🍌",opts:["🍌","🥕","🦴"]},
 {q:"🐰",a:"🥕",opts:["🥕","🍎","🍌"]},
 {q:"🐶",a:"🦴",opts:["🍗","🦴","🥕"]}
];

const s3=[
 {q:"🔊",a:"🐱",sound:"cat.mp3"},
 {q:"🔊",a:"🐶",sound:"dog.mp3"},
 {q:"🔊",a:"🐮",sound:"cow.mp3"}
];

function startGame(){
  for(let i=1;i<=3;i++){
    document.getElementById("s"+i).innerHTML="☆";
    document.getElementById("s"+i).classList.remove("starFill");
  }
  session=1;
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  loadSession();
}

function fillStar(n){
  document.getElementById("s"+n).innerHTML="🌟";
  document.getElementById("s"+n).classList.add("starFill");
}

function loadSession(){
 q=0;firstTry=true;
 sessionTitle.innerText="SESSION "+session;
 loadQuestion();
}

function loadQuestion(){
 options.innerHTML="";
 progress.innerText=(q+1)+"/3";
 let data=[null,s1,s2,s3][session][q];
 question.innerHTML=data.q;
 hint.innerHTML=session==2?"Which food does it eat?":"";
 if(session==3)new Audio(data.sound).play();
 shuffle((data.opts||["🐱","🐶","🐮"])).forEach(e=>{
   makeBtn(e,e==data.a);
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
       if(firstTry)fillStar(session);
       session++;
       if(session==4){
         setTimeout(()=>congratsSnd.play(),300);
         return;
       }
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

function shuffle(a){return a.sort(()=>Math.random()-.5);}
