let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let names = ["RadhaKrishna", "RadhaRani", "KrishnaBalram", "JagannathJi"];
let score=[];

let h1 = document.querySelector("h1");
let h4 = document.querySelector("h4");
let h3 = document.querySelector("h3");

let boxes = document.querySelectorAll(".box");
let body=document.querySelector("body");

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}
function levelUp() {
  level++;
  userSeq=[];
  h3.innerText = `Level ${level}`;
  h4.innerText="";
  let randIdx = Math.floor(Math.random() * 4);
  let randName = names[randIdx];
  let randBtn = document.querySelector(`.${randName}`);
  gameSeq.push(randName);
  console.log(`Game Seq: ${gameSeq}`);
  gameFlash(randBtn);
}
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;
  }
  levelUp();
});

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
function checkSeq(idx) {
    if(gameSeq[idx]==userSeq[idx]){
        if(idx==level-1){
            setTimeout(levelUp,1000);
        }
    }
    else{
        body.style.backgroundColor="red";
        setTimeout(()=>{
            body.style.backgroundColor="white";
        },200);
        score.push(level);
        let max=score.reduce((res,ele)=>{
            if(ele>res) return ele;
            else return res;
        });
        h4.innerHTML=`Game Over! Your score is <b>${level}</b> <br> <i> Highest Score: ${max} <i> <br> Press any key to restart.`;
        h3.innerText="";
        reset();
    }
}

function userFlash(btn) {
  btn.classList.add("uFlash");
  setTimeout(() => {
    btn.classList.remove("uFlash");
  }, 200);
}
function btnPress() {
  console.log("Button is pressed");
  console.log(this);
  let userBtn = this.getAttribute("id");
  userSeq.push(userBtn);
  console.log(`User Seq: ${userSeq}`);
  userFlash(this);
  let idx=userSeq.length-1;
  checkSeq(idx);
}

for (box of boxes) {
  box.addEventListener("click", btnPress);
}
