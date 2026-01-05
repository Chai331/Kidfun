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
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  session=1;
  for(let i=1;i<=3;i++)document.getElementById("s"+i).innerHTML="☆";
  loadSession();
}

function fillStar(n){
  const s=document.getElementById("s"+n);
  s.innerHTML="🌟";
  s.classList.add("starFill");
}

function loadSession(){
  q=0; firstTry=true;
  sessionTitle.innerText="SESSION "+session;
  loadQuestion();
}

function loadQuestion(){
  options.innerHTML="";
  let data=[null,s1,s2,s3][session][q];
  progress.innerText=(q+1)+"/3";
  question.innerHTML=data.q;
  hint.innerHTML=(session==2?"Which food does it eat?":"");
  if(session==3)new Audio(data.sound).play();

  shuffle((data.opts||["🐱","🐶","🐮"])).forEach(e=>{
    makeBtn(e,e==data.a);
  });
}

function makeBtn(txt,correct){
  const b=document.createElement("div");
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
          setTimeout(()=>congratsSnd.play(),400);
          return;
        }
        setTimeout(loadSession,1000);
      }else setTimeout(loadQuestion,700);
    }else{
      wrongSnd.play();
      b.classList.add("wrong");
      firstTry=false;
    }
  }
  options.appendChild(b);
}

function shuffle(a){return a.sort(()=>Math.random()-.5);}
