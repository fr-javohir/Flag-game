const difficulty = document.getElementById("difficulty");
const order = document.querySelector(".order");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalScore = document.querySelector(".modal-score");
const modalBtn = document.querySelector("#modal-btn");
const counter = document.querySelector(".counter");
const timeEl = document.querySelector(".time");
const btn = document.querySelectorAll(".btn");
const img = document.querySelector("img");
let score = 0;
let time = 15;
let shart = true;
let random1, random2, random3, random4, error1, error2, error3, answer;

const reload = async () => {
  const api = "https://restcountries.com/v2/all";
  const req = await fetch(api);
  const json = await req.json();
  getData(json);
  function getData(data) {
    random1 = Math.floor(Math.random() * 251);
    random2 = Math.floor(Math.random() * 250 + 1);
    random3 = Math.floor(Math.random() * 250 + 1);
    random4 = Math.floor(Math.random() * 250 + 1);
    answer = data[random1].name;
    error1 = data[random2].name;
    error2 = data[random3].name;
    error3 = data[random4].name;
    const array = [0, 1, 2, 3];
    const newArray = [];
    for (let i = 0; i < 4; i++) {
      const optionIndex = array[Math.floor(Math.random() * array.length)];
      const index = array.indexOf(optionIndex);
      array.splice(index, 1);
      newArray.push(optionIndex);
    }
    img.src = data[random1].flags.png;
    btn[newArray[0]].textContent = answer;
    btn[newArray[1]].textContent = error1;
    btn[newArray[2]].textContent = error2;
    btn[newArray[3]].textContent = error3;
    order.textContent = 'Find the country of this flag'
    come = true
    dataC = true
    btn.forEach((aBtn) => {
      aBtn.classList.remove('red')
      aBtn.classList.remove('green')
    });
  }
};
let dataC = true
function timeReset() {
  if(dataC){
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
      modalScore.textContent = score;
      timeEl.textContent = 0;
      clearInterval(interval);
  }
  }
}
let interval = setInterval(timeReset, 1000);
reload();
let come = true
for (let i = 0; i < 4; i++) {
  btn[i].addEventListener("click", function () {    
    if(come){
      if (answer == btn[i].textContent) {
        if (difficulty.value == "easy") {
          time += 5;
        }
        if (difficulty.value == "medium") {
          time += 4;
        }
        if (difficulty.value == "hard") {
          time += 3;
        }
        btn[i].classList.add('green')
        score++;
        counter.textContent = score;
        reload();
        come = false
        dataC = false
      } else {
        time -= 2;
        reload();
        btn[i].classList.add('red')
        come = false
        dataC = false
        order.textContent = `To'g'ri javob : ${answer}`
    }        
    }

  });
}
modalBtn.addEventListener("click", function () {
  reload();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  score = 0;
  counter.textContent = 0;
  time = 15;
  interval = setInterval(timeReset, 1000);
});

difficulty.addEventListener("change", () => {
  time = 15;
  reload();
  score = 0
  counter.textContent = 0
});
