const stars = document.querySelector('.stars');
const move_counter = document.querySelector('.move_counter');
const game = document.querySelector('.game');
const card = document.querySelector('.card');


const icons = ["icons/1_1.svg", "icons/2_1.svg", "icons/3_1.svg", "icons/4_1.svg", "icons/5_1.svg", "icons/6_1.svg", "icons/7_1.svg", "icons/8_1.svg", "icons/1_1.svg", "icons/2_1.svg", "icons/3_1.svg", "icons/4_1.svg", "icons/5_1.svg", "icons/6_1.svg", "icons/7_1.svg", "icons/8_1.svg"];

for (let i = 1; i <= 2; i++) {
  for (let i = 1; i <= 8; i++) {
    const list = document.createElement('li');
    const image = document.createElement('img');
    const randomNum = Math.floor(Math.random() * icons.length);
    image.src = icons[randomNum];
    image.className = "hide";
    list.className = "list_item"
    card.appendChild(list);
    list.appendChild(image);
    icons.splice(randomNum, 1);
  }
}
var displayTime=0;
var time = 0;
var offset = 0;
let images = [];
let list = document.querySelector('.list_item');

card.addEventListener('click', doGame, false);
document.addEventListener('click', timer, false);

function timer(evt) {
  let visibleCard = document.querySelector('.show');
  let hiddenCard = document.querySelector('.hide');


  if (evt.target.nodeName === "LI" && counter === 1 ) {
   console.log("ul vette az adást" );
   displayTime = setInterval(actualTime, 10);
   offset = Date.now();

   } else if (visibleCard == undefined && hiddenCard == undefined) {
     clearInterval(displayTime);
   }
 }




var counter=0;
function doGame(e) {
  if (e.target !== e.currentTarget) {

    if (e.target.firstChild.classList.contains('hide')) {
      show(e);
      counter+=1;
      console.log(counter);
    }
  }
}

function show(e) {
  e.target.firstChild.setAttribute('class', 'show');
  addList(e);
}

function addList(e) {
  images.push(e.target.firstChild.src);
  if (images.length == 2) {
    check(e);
    }
  }

function check(e) {
  let first = images[0].toString();
  let second = images[1].toString();

  if (first === second) {
    e.target.firstChild.setAttribute('class', 'match');
    var image = document.querySelector('.show');
    image.setAttribute('class', 'match');
    images = [];
  }  else if (first != second) {
    setTimeout(function hideAll() {
      e.target.firstChild.setAttribute('class', 'hide');
      var image = document.querySelector('.show');
      image.setAttribute('class', 'hide');
      images = [];
    }, 500);
    }
}


   function actualTime(evt) {
    time+=delta();
    timeCounter.textContent=timeFormatter(time);

  }

  function delta() {
   var now = Date.now();
   var timePassed = now - offset;
   offset = now;
   return timePassed;
 }

// var minutes=0;
// var seconds=0;
// var milliseconds=0;

  function timeFormatter(time) {
    time = new Date(time);
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    while (milliseconds.length < 3) {
      milliseconds = '0' + milliseconds;
    }

    return minutes + ' : ' + seconds + ' : ' + milliseconds;
  }

  const timeCounter = document.createElement('p');
  const resultsSection =document.querySelector('.results');
  resultsSection.appendChild(timeCounter);
