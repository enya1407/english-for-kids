import '../styles/style.scss';
import './burger.js';
import { renderCardsCategory, renderCardsWord } from './renderCards.js';

const cardContainer = document.querySelector('.card-container');
cardContainer.append(renderCardsCategory());
const checkbox = document.querySelector('.checkbox'); // checkbox.checked начальное false

const cleanContainer = () => {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
};
// кнопка
const switch1 = document.querySelector('.slider');

switch1.addEventListener('click', () => {
  if (document.querySelectorAll('.card')[0].classList[1] === 'cardsCategory') {
    if (!checkbox.checked) {
      document.querySelectorAll('.card').forEach((el) => el.classList.add('cardPlay'));
    } else {
      document.querySelectorAll('.card').forEach((el) => el.classList.remove('cardPlay'));
    }
  } else if (!checkbox.checked) {
    document.querySelectorAll('.card>span').forEach((el) => {
      // el.textContent = '';
      el.classList.add('transparent');
    });
  } else {
    document.querySelectorAll('.card>span').forEach((el) => {
      // el.textContent = `${text}`;
      el.classList.remove('transparent');
    });
  }
});

// переход к категориям

document.addEventListener('click', (evt) => {
  const category = evt.target.closest('.cardsCategory').classList[2];
  if (category) {
    cleanContainer();
    if (category === 'Main-Page') {
      cardContainer.append(renderCardsCategory());
    } else {
      cardContainer.append(renderCardsWord(category));
    }
  }
});

// //аудио

// function soundClick() {
//   const audio = new Audio();
//   audio.src = audioSrc;
//   audio.autoplay = true;
// }
