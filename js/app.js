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
    card.appendChild(list);
    list.appendChild(image);
    icons.splice(randomNum, 1);
  }
}

// Do not care this:

const lists = document.querySelectorAll('li');

    for (let i = 0; i < lists.length; i++) {
      lists[i].addEventListener("click", function(e) {
        const icon = this.firstChild;

        icon.classList.add('show');
        // icon.classList.remove('hide');
        const visible = document.querySelector('.show');
        const visibleNr = visible.src.charAt(visible.src.length-7);
        const nr = icon.src.charAt(icon.src.length-7);

        if (nr !== visibleNr) {
            // icon.classList.add('hide');
            icon.classList.remove('show');
            visible.classList.remove('show')
          }

        // const visible = document.querySelector('.show');
        // const visibleNr = (visible.src).charAt((visible.src).length-7);
        // const nr = (icon.src).charAt((icon.src).length-7);


        console.log(nr);
        console.log(visibleNr);

        // for (let i = 0; i < lists.length; i++) {
        //   let visible = document.querySelector('.show').src;
        //   // let visibleNr = visible.charAt(visible.length-7);
        //   console.log(visible); }
        // //
        //   if (nr !== visibleNr) {
        //       icon.classList.add('hide');
        //       icon.classList.remove('show');
        //       document.querySelector('img').classList.add('hide');
        //     document.querySelector('img').classList.remove('show');
        //
        //       console.log('here1');
        //     }
        // }
        //
        //   e.stopPropagation;
      }, false);
    }
