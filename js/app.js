'use strict';

const stars = document.querySelector('.stars');
const move_counter = document.querySelector('.move_counter');
const game = document.querySelector('.game');
const reload = document.querySelector('.reload');

// This contains the icons for the cards

var icons = ['icons/1_1.svg', 'icons/2_1.svg', 'icons/3_1.svg', 'icons/4_1.svg', 'icons/5_1.svg', 'icons/6_1.svg', 'icons/7_1.svg', 'icons/8_1.svg', 'icons/1_1.svg', 'icons/2_1.svg', 'icons/3_1.svg', 'icons/4_1.svg', 'icons/5_1.svg', 'icons/6_1.svg', 'icons/7_1.svg', 'icons/8_1.svg'];

// This function creates the memory card table with the shuffled icons

function makeGamePage() {
  const card = document.createElement('ul');
  card.className = 'card';
  game.appendChild(card);
  for (let i = 1; i <= 2; i++) {
    for (let i = 1; i <= 8; i++) {
      const list = document.createElement('li');
      const image = document.createElement('img');
      const randomNum = Math.floor(Math.random() * icons.length);
      image.src = icons[randomNum];
      image.className = 'hide';
      image.classList.add('animated');
      list.className = 'purple';
      list.classList.add('animated');
      card.appendChild(list);
      list.appendChild(image);
      icons.splice(randomNum, 1);
    }
  }
}

makeGamePage()

// This event listener handle the icons and the stars visibility options.

// When this array has two objects, a function compares them:
// if they match, they will stay visible, if not, they will be hidden.
// This listener also counts the clicks, 2 clicks equal 1 move.
// After every 7 moves 1 star disapear.

game.addEventListener('click', doGame, true);

var counter = 0;
let images = [];

// If an icon classlist contains 'hide', then it will call the show() function,
// and also starts counting the clicks. It also controls that just 2 cards can be opened at the same time.

function doGame(e) {
  let valid =0;
  let listel = e.currentTarget.childNodes[1].childNodes.forEach(listel => {

    if (listel.firstChild.classList[0] === 'show') {
      valid+=1;
      }
      return valid;
  });
  if (e.target !== e.currentTarget && valid < 2) {
    if (e.target.firstChild.classList.contains('hide')) {
      show(e);
      counter += 1;
    }
  }
}

// This function will show the card to the user, and change the
// background color. Then call the addList() function

function show(e) {
  e.target.firstChild.setAttribute('class', 'show');
  e.target.classList.add('white');
  addList(e);
}


// This collects the src name of the flipped cards into an array
// When the array has 2 items, it will call the check() function

function addList(e) {
  images.push(e.target.firstChild.src);
  if (images.length == 2) {
    check(e);
  }
}

// Converts the array items into string, after compares them.
// If the two strings are the same, the images will have the class "match",
// and clear the images array. They background will be green first,
// then itt will be change again to the final brighter color.
// Also the cards will have a little css animation.
// If the two strings are not the same, the flipped images will be hidden again,
// and clear the images array. The background color will be red first,
// and there will be a little css animation. Then the backround will be purple,
// like the other hidden cards.
// At the end of the function the scoreTable() and the starMoves() function
// will be called.

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
      images = [];
      img.parentElement.classList.remove('white');
      e.target.classList.remove('white');
      img.parentElement.classList.add('green', 'bounceIn');
      e.target.classList.add('green', 'bounceIn');
      setTimeout(function hideAll() {
        img.parentElement.setAttribute('class','white');
        e.target.setAttribute('class','white');
      }, 1000);
    });
    scoreTable();
  }  else if (first != second) {
    let img = document.querySelectorAll('.show');
    [].forEach.call(img, function(img) {
      images = [];
      img.parentElement.classList.remove('white');
      e.target.classList.remove('white');
      img.parentElement.classList.add('red', 'swing');
      e.target.classList.add('red', 'swing');
      setTimeout(function hideAll() {
        img.setAttribute('class', 'hide')
        img.parentElement.setAttribute('class','purple');
        e.target.setAttribute('class','purple');
        img.parentElement.classList.add('animated');
        e.target.classList.add('animated');
      }, 600);
    });
  }
  starMoves();
}

// This function handles the star icons and the number of the MOVES
// at the top of the game board. Two flipped cards equal one moves.
// After every seventh moves one star will be disappear

var stars_nr = 0;

function starMoves() {
  var moveCounterNumber = (counter / 2).toFixed(0);
  move_counter.textContent = moveCounterNumber + ' MOVES';

  if (moveCounterNumber == 7) {
    stars.querySelectorAll('img')[2].style.visibility ='hidden';
    stars_nr = 3 - 1;
  } else if (moveCounterNumber == 14) {
    stars.querySelectorAll('img')[1].style.visibility='hidden';
    stars_nr = 3 - 2;
  } else if (moveCounterNumber == 21) {
    stars.querySelectorAll('img')[0].style.visibility='hidden';
    stars_nr = 3 - 3;
  }
}

// The scoreTable() function holds and shows the results of the previous games.
// This function will be called after every cards is visible,
// so the game is over.
// The scoreMoves, scoreStars and scoreTime arrays will hold the final data of
// the game. After every game round the nr variable will increase by one,
// it will be the number of the finished game (Game 1, Game 2 .etc.), and it
// will help to show the current results from the arrays (nr-1)

var scoreMoves = [];
var scoreStars = [];
var scoreTime = [];
var nr = 0;

function scoreTable() {
  const visibleCard = document.querySelector('.show');
  const hiddenCard = document.querySelector('.hide');

  if (visibleCard == undefined && hiddenCard == undefined) {
    nr += 1;
    scoreMoves.push((counter/2).toFixed(0));
    scoreStars.push(stars_nr);
    scoreTime.push(timeFormatter(time));

    const gameName = document.createElement('h4');
    gameName.textContent = 'Game ' + nr;
    document.querySelector('.gameHead').appendChild(gameName);

    const moveResults = document.createElement('h4');
    moveResults.textContent = scoreMoves[nr - 1];
    document.querySelector('.moveHead').appendChild(moveResults);

    const starResults = document.createElement('h4');
    starResults.textContent = scoreStars[nr - 1];
    document.querySelector('.starHead').appendChild(starResults);

    const timeResults = document.createElement('h4');
    timeResults.textContent = scoreTime[nr - 1];
    document.querySelector('.timeHead').appendChild(timeResults);
  }
}

// This eventlistener handles the timer - which stars after the first click
// on the list item, and stops when // all of the icon's
// classlist contains 'match'.
// When it stops it's also shows the user their results.
// I watched this video, and checked this code,
// and I was inspired by his method:
//  https://www.youtube.com/watch?v=jRhB1IG7uAw&t=1387s

document.addEventListener('click', timer, false);

var displayTime = 0;
var time = 0;
var timezero = 0;
var timeCounter = document.querySelector('.time');

// When the event listener reaches the list node element and the
// counter variable value is one, the timer will starts.
// It will displays the time in every 100 milliseconds.
// When there will be no hidden cards, just matched pairs,
// the timer will stop, and the congratulations window will popup
// with the final results. If the user clicks to a "Play again"
// button, then the game, timer, movecounter and the stars reset.
// If clicks somewhere else, the congratulations window will diappear,
// and the gameboard remains with the final game.

function timer(evt) {
  const visibleCard = document.querySelector('.show');
  const hiddenCard = document.querySelector('.hide');
  if (evt.target.nodeName === 'LI' && counter === 1 ) {
    displayTime = setInterval(actualTime, 100);
    timezero = Date.now();
    evt.stopPropagation();
  } else if (visibleCard == undefined && hiddenCard == undefined) {
    clearInterval(displayTime);
    const congrat = document.querySelector('.congrat');
    congrat.style.display ='block';
    const text = document.createElement('h2');
    text.innerHTML ='Your results:<br>' + 'Time: ' + timeFormatter(time) +'<br>Moves: ' + (counter / 2).toFixed(0) + '<br>Stars: ' + stars_nr;
    document.querySelector('.gratHead').appendChild(text);
    document.querySelector('button').addEventListener('click', setDefault, false);
    document.addEventListener('click', function(){
      congrat.style.display ='none';
      evt.stopPropagation();
    });
  }

}

// The actualTime() and the delay() functions create a timer
// which starts from zero

function actualTime(evt) {
  time += delay();
  timeCounter.textContent = timeFormatter(time);
}

function delay() {
  var now = Date.now();
  var timePassed = now - timezero;
  timezero = now;
  return timePassed;
}

// This function create a timeaformat for the timer (minutes, seconds
// and milliseconds)

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

// This eventlistener setDefault function reset the game, which means it will:
// - remove the parent createElement
// - reload the icons into the array
// - set everything to zero, show the stars
// - set the congratulation display: none - because previously I used this
//  eventlistener for the congratulations 'start new game' button

reload.addEventListener('click', setDefault, false);

function setDefault(event) {
  event.preventDefault();
  const game = document.querySelector('.game');
  const card = document.querySelector('.card')
  game.removeChild(card);
  icons = ['icons/1_1.svg', 'icons/2_1.svg', 'icons/3_1.svg', 'icons/4_1.svg', 'icons/5_1.svg', 'icons/6_1.svg', 'icons/7_1.svg', 'icons/8_1.svg', 'icons/1_1.svg', 'icons/2_1.svg', 'icons/3_1.svg', 'icons/4_1.svg', 'icons/5_1.svg', 'icons/6_1.svg', 'icons/7_1.svg', 'icons/8_1.svg'];
  images = [];
  clearInterval(displayTime);
  time = 0;
  counter = 0;
  timeCounter.textContent ='00 : 00 : 000'
  move_counter.textContent ='0 MOVES';
  stars.querySelectorAll('img')[2].style.visibility='visible';
  stars.querySelectorAll('img')[1].style.visibility='visible';
  stars.querySelectorAll('img')[0].style.visibility='visible';
  makeGamePage();
  document.querySelector('.congrat').style.display='none';
}
