import '../styles/style.scss';
import './burger.js';
import cardsArr from './cards.js';
// карточки
const cards = cardsArr.map((el) => el.name);
const cardContainer = document.querySelector('.card-container');
const fragment = new DocumentFragment();
console.log(cards);

const renderCards = () => {
  cards.forEach((el) => {
    const card = document.createElement('a');
    card.classList.add('card');
    card.setAttribute('href', `#${el}`);
    card.textContent = el;

    const cardImg = document.createElement('div');
    cardImg.classList.add('card__img', el);

    card.append(cardImg);
    fragment.append(card);
  });

  cardContainer.append(fragment);
};

renderCards();

// кнопка

const switch1 = document.querySelector('.slider');
const card1 = document.querySelectorAll('.card');
let switchOn = true; //train
switch1.addEventListener('click', () => {
  if (switchOn) {
    card1.forEach((el) => el.classList.add('cardPlay'));
  } else {
    card1.forEach((el) => el.classList.remove('cardPlay'));
  }
  switchOn = !switchOn;
});
