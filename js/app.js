const stars = document.querySelector('.stars');
const move_counter = document.querySelector('.move_counter');
const game = document.querySelector('.game');
const card = document.querySelector('.card');
const reload = document.querySelector('.reload');


var icons = ["icons/1_1.svg", "icons/2_1.svg", "icons/3_1.svg", "icons/4_1.svg", "icons/5_1.svg", "icons/6_1.svg", "icons/7_1.svg", "icons/8_1.svg", "icons/1_1.svg", "icons/2_1.svg", "icons/3_1.svg", "icons/4_1.svg", "icons/5_1.svg", "icons/6_1.svg", "icons/7_1.svg", "icons/8_1.svg"];

makeGamePage()

function makeGamePage() {
  const card = document.createElement('ul');
  card.className = "card";
  game.appendChild(card);

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
}

var displayTime = 0;
var time = 0;
var offset = 0;
let images = [];
let list = document.querySelector('.list_item');

game.addEventListener('click', doGame, false);
document.addEventListener('click', timer, false);
reload.addEventListener('click', setDefault, false);

function setDefault(event) {
  event.preventDefault();
  const game = document.querySelector('.game');
  const card = document.querySelector('.card')
  game.removeChild(card);
  icons = ["icons/1_1.svg", "icons/2_1.svg", "icons/3_1.svg", "icons/4_1.svg", "icons/5_1.svg", "icons/6_1.svg", "icons/7_1.svg", "icons/8_1.svg", "icons/1_1.svg", "icons/2_1.svg", "icons/3_1.svg", "icons/4_1.svg", "icons/5_1.svg", "icons/6_1.svg", "icons/7_1.svg", "icons/8_1.svg"];
  images = [];
  clearInterval(displayTime);
  time=0;
  counter=0;
  timeCounter.textContent ="00 : 00 : 000"
  move_counter.textContent ="0 MOVES";
  makeGamePage();
  document.querySelector('.congrat').style.display="none";
}


function timer(evt) {
  let visibleCard = document.querySelector('.show');
  let hiddenCard = document.querySelector('.hide');


  if (evt.target.nodeName === "LI" && counter === 1 ) {
   console.log("ul vette az adást" );
   displayTime = setInterval(actualTime, 10);
   offset = Date.now();

   } else if (visibleCard == undefined && hiddenCard == undefined) {
     clearInterval(displayTime);
     const congrat= document.querySelector('.congrat');
     congrat.style.display="block";
     const text = document.createElement('p');
     text.innerHTML="Your results:<br>" + "Time: " + timeFormatter(time) +"<br>Moves: " + (counter / 2).toFixed(0) + "<br>Stars: " + ((counter/2)/7).toFixed(0);
     document.querySelector('.gratHead').appendChild(text);
     document.querySelector('button').addEventListener('click', setDefault, false);
     document.addEventListener('click', function(){
       congrat.style.display="none";
     });
   }
   evt.stopPropagation();
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
  starMoves();
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



function starMoves() {
  var moveCounterNumber = (counter / 2).toFixed(0);
  move_counter.textContent= moveCounterNumber + " MOVES";

  if (moveCounterNumber == 7) {
    console.log("in" );
    stars.getElementsByTagName('img')[2].style.visibility="hidden";
  } else if (moveCounterNumber == 14) {
    stars.getElementsByTagName('img')[1].style.visibility="hidden";
  } else if (moveCounterNumber == 21) {
  stars.getElementsByTagName('img')[0].style.visibility="hidden";
}
}
