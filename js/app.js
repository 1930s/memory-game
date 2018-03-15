const stars = document.querySelector('.stars');
const move_counter = document.querySelector('.move_counter');
const game = document.querySelector('.game');
const card = document.querySelector('.card');
const reload = document.querySelector('.reload');

// This contains the icons for the cards

var icons = ["icons/1_1.svg", "icons/2_1.svg", "icons/3_1.svg", "icons/4_1.svg", "icons/5_1.svg", "icons/6_1.svg", "icons/7_1.svg", "icons/8_1.svg", "icons/1_1.svg", "icons/2_1.svg", "icons/3_1.svg", "icons/4_1.svg", "icons/5_1.svg", "icons/6_1.svg", "icons/7_1.svg", "icons/8_1.svg"];

// This function creates the memory card table with the shuffled icons

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
      image.classList.add("animated");
      list.className = "purple";
      list.classList.add("animated");
      card.appendChild(list);
      list.appendChild(image);
      icons.splice(randomNum, 1);
    }
  }
}

makeGamePage()

// This event listener handle the icons and the stars visibility options.
// If an icon classlist contains "hide", then it will show it to a user,
// and collects the src name of these into an array.
// When this array has two objects, a function compares them:
// if they match, they will stay visible, if not, they will be hidden.
// This listener also counts the clicks, 2 clicks equal 1 move.
// After every 7 moves 1 star disapear.

game.addEventListener('click', doGame, true);

var counter=0;
let images = [];

function doGame(e) {
  if (e.target !== e.currentTarget) {
    if (e.target.firstChild.classList.contains('hide')) {
      show(e);
      counter+=1;
      console.log(counter);
      console.log(images);
    }
  }
}

function show(e) {
  e.target.firstChild.setAttribute('class', 'show');
  e.target.classList.add('white');
  addList(e);
}

function addList(e) {
  images.push(e.target.firstChild.src);
  if (images.length == 2) {
    check(e);
  }
}

function check(e) {
  const first = images[0].toString();
  const second = images[1].toString();
  const firstC = e.target.firstChild;

  if (first === second) {
    images = [];
    let img = document.querySelectorAll('.show');
    [].forEach.call(img, function(img) {
      firstC.setAttribute('class', 'match');
      img.setAttribute('class', 'match');
      let image = document.querySelector('.show');
      images = [];
      img.parentElement.classList.remove("white");
      e.target.classList.remove("white");
      img.parentElement.classList.add("green", "bounceIn");
      e.target.classList.add("green", "bounceIn");
      setTimeout(function hideAll() {
       img.parentElement.setAttribute('class',"white");
       e.target.setAttribute('class',"white");
      }, 1000);
      });
      scoreTable();
    }  else if (first != second) {
        let img = document.querySelectorAll('.show');
        [].forEach.call(img, function(img) {
          let image = document.querySelector('.show');
          images = [];
          img.parentElement.classList.remove("white");
          e.target.classList.remove("white");
          img.parentElement.classList.add("red", "swing");
          e.target.classList.add("red", "swing");
          setTimeout(function hideAll() {
            img.setAttribute('class', 'hide')
            img.parentElement.setAttribute('class',"purple");
            e.target.setAttribute('class',"purple");
            img.parentElement.classList.add("animated");
            e.target.classList.add('animated');
          }, 1000);
        });
    }
  starMoves();
}

var stars_nr = 0;

function starMoves() {
  var moveCounterNumber = (counter / 2).toFixed(0);
  move_counter.textContent= moveCounterNumber + " MOVES";

  if (moveCounterNumber == 7) {
    console.log("in" );
    stars.querySelectorAll('img')[2].style.visibility="hidden";
    stars_nr=3-1;
  } else if (moveCounterNumber == 14) {
      stars.querySelectorAll('img')[1].style.visibility="hidden";
      stars_nr=3-2;
  } else if (moveCounterNumber == 21) {
      stars.querySelectorAll('img')[0].style.visibility="hidden";
      stars_nr=3-3;
  }
}

// This eventlistener handles the timer - which stars after the first click
// on the list item, and stops when
// all of the icons classlist contains "match".
// When it stops it's also shows the user their results.

document.addEventListener('click', timer, false);

var displayTime = 0;
var time = 0;
var timezero = 0;
var timeCounter = document.querySelector('.time');

function timer(evt) {
  const visibleCard = document.querySelector('.show');
  const hiddenCard = document.querySelector('.hide');
    if (evt.target.nodeName === "LI" && counter === 1 ) {
     displayTime = setInterval(actualTime, 100);
     timezero = Date.now();
     evt.stopPropagation();
    } else if (visibleCard == undefined && hiddenCard == undefined) {
       clearInterval(displayTime);
       const congrat = document.querySelector('.congrat');
       congrat.style.display ="block";
       const text = document.createElement('p');
       text.innerHTML ="Your results:<br>" + "Time: " + timeFormatter(time) +"<br>Moves: " + (counter / 2).toFixed(0) + "<br>Stars: " + stars_nr;
       document.querySelector('.gratHead').appendChild(text);
       document.querySelector('button').addEventListener('click', setDefault, false);
       document.addEventListener('click', function(){
       congrat.style.display="none";
       evt.stopPropagation();
     });
   }

}

function actualTime(evt) {
    time+=delay();
    timeCounter.textContent=timeFormatter(time);
}

function delay() {
   var now = Date.now();
   var timePassed = now - timezero;
   timezero = now;
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

// This eventlistener set default the memory game, which menas it will:
// - remove the parent createElement
// - reload the icons into the array
// - set everything to zero, show the stars
// - set the congratulation display: none - because previously I used this
//  eventlistener for the congratulations "start new game" button

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
  stars.querySelectorAll('img')[2].style.visibility="visible";
  stars.querySelectorAll('img')[1].style.visibility="visible";
  stars.querySelectorAll('img')[0].style.visibility="visible";
  makeGamePage();
  document.querySelector('.congrat').style.display="none";
}

// The scoreTable() function holds and showthe results of the previous games

var scoreMoves=[];
var scoreStars=[];
var scoreTime=[];
var nr = 0;

function scoreTable() {
  const visibleCard = document.querySelector('.show');
  const hiddenCard = document.querySelector('.hide');

  if (visibleCard == undefined && hiddenCard == undefined) {
    nr+=1;
    scoreMoves.push((counter/2).toFixed(0));
    scoreStars.push(stars_nr);
    scoreTime.push(timeFormatter(time));

    const gameName = document.createElement('h3');
    gameName.textContent = "Game " + nr;
    document.querySelector('.gameHead').appendChild(gameName);

    const moveResults = document.createElement('h3');
    moveResults.textContent = scoreMoves[nr-1];
    document.querySelector('.moveHead').appendChild(moveResults);

    const starResults = document.createElement('h3');
    starResults.textContent=scoreStars[nr-1];
    document.querySelector('.starHead').appendChild(starResults);

    const timeResults = document.createElement('h3');
    timeResults.textContent=scoreTime[nr-1];
    document.querySelector('.timeHead').appendChild(timeResults);

    console.log("scoremoves", scoreMoves, nr)
  }
}
