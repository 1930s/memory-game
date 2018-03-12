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

let images = [];
let list = document.querySelector('.list_item');
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
    setTimeout(function hideall() {
      console.log("images not equal");
      e.target.firstChild.setAttribute('class', 'hide');
      var image = document.querySelector('.show');
      image.setAttribute('class', 'hide');
      console.log(image);
      images = [];
    }, 500);
    }
}

card.addEventListener('click', doGame, false);
