let session=1, q=0, firstTry=true;
let stars=[0,0,0];

const s1=[
  {q:"🐱",a:"🐱"},
  {q:"🐶",a:"🐶"},
  {q:"🐮",a:"🐮"}
];

const s2=[
  {animal:"🐵",food:"🍌"},
  {animal:"🐰",food:"🥕"},
  {animal:"🐶",food:"🦴"}
];

const s3=[
  {sound:"cat.mp3",a:"🐱"},
  {sound:"dog.mp3",a:"🐶"},
  {sound:"cow.mp3",a:"🐮"}
];

function startGame(){
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  loadSession();
}

function fillStar(n){
  document.getElementById("s"+n).innerHTML="🌟";
  document.getElementById("s"+n).classList.add("starFill");
}

function loadSession(){
  q=0; firstTry=true;
  sessionTitle.innerText="Session "+session;
  next();
}

function next(){
  options.innerHTML="";
  questionArea.innerHTML="";
  if(session==1)session1();
  if(session==2)session2();
  if(session==3)session3();
}

function session1(){
  let data=s1[q];
  questionArea.innerHTML=data.q;
  shuffle(["🐱","🐶","🐮"]).forEach(e=>makeBtn(e,e==data.a));
}

function session2(){
  let data=s2[q];
  questionArea.innerHTML=data.animal;
  shuffle(["🍌","🥕","🦴"]).forEach(e=>makeBtn(e,e==data.food));
}

function session3(){
  let data=s3[q];
  new Audio(data.sound).play();
  shuffle(["🐱","🐶","🐮"]).forEach(e=>makeBtn(e,e==data.a));
}

function makeBtn(txt,correct){
  let d=document.createElement("div");
  d.className="opt";
  d.innerText=txt;
  d.onclick=()=>{
    if(correct){
      correctSnd.currentTime=0; correctSnd.play();
      d.classList.add("correct");
      q++;
      if(q==3){
        if(firstTry){ stars[session-1]=1; fillStar(session); }
        session++;
        if(session==4){ congrats.play(); return; }
        setTimeout(loadSession,1200);
      } else setTimeout(next,700);
    } else {
      wrongSnd.currentTime=0; wrongSnd.play();
      d.classList.add("wrong");
      firstTry=false;
    }
  }
  options.appendChild(d);
}

function shuffle(a){ return a.sort(()=>Math.random()-.5); }
