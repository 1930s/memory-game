const stars = document.querySelector('.stars');
const move_counter = document.querySelector('.move_counter');
const game = document.querySelector('.game');
const card = document.querySelector('.card');

const icons = ["icons/1_1.svg", "icons/1_2.svg", "icons/2_1.svg", "icons/2_2.svg", "icons/3_1.svg", "icons/3_2.svg", "icons/4_1.svg", "icons/4_2.svg", "icons/5_1.svg", "icons/5_2.svg", "icons/6_1.svg", "icons/6_2.svg", "icons/7_1.svg", "icons/7_2.svg", "icons/8_1.svg", "icons/8_2.svg"];


for (let i = 1; i <= 16; i++) {
  const list = document.createElement('li');
  const image = document.createElement('img');
  const randomNum = Math.floor(Math.random() * icons.length);
  image.src= icons[randomNum];
  card.appendChild(list);
  list.appendChild(image);
  icons.splice(randomNum, 1);
}
