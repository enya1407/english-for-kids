import cardsArr from './cards.js';

const checkbox = document.querySelector('.checkbox'); // checkbox.checked начальное false
const cardsCategory = cardsArr.map((el) => el.name);

const fragment = new DocumentFragment();

const renderCardsCategory = () => {
  cardsCategory.forEach((el) => {
    const card = document.createElement('div');
    card.classList.add('card', 'cardsCategory', el);
    if (checkbox.checked) {
      card.classList.add('cardPlay');
    }
    const span = document.createElement('span');
    span.textContent = el;
    card.append(span);

    const cardImg = document.createElement('div');
    cardImg.classList.add('card__img', `${el}__img`);

    card.append(cardImg);
    fragment.append(card);
  });

  return fragment;
};

const renderCardsWord = (category) => {
  const cardsWord = cardsArr.filter((el) => el.name === category)[0].cards;
  cardsWord.forEach((el) => {
    const card = document.createElement('div');
    card.classList.add('card', el.word);

    const cardImg = document.createElement('div');
    cardImg.classList.add('card__img');
    cardImg.style.backgroundImage = el.image;

    const span = document.createElement('span');

    if (checkbox.checked) {
      card.classList.add('cardPlay');
    } else {
      span.textContent = el.word;
    }
    card.append(span);
    card.append(cardImg);
    fragment.append(card);
  });
  return fragment;
};
export { renderCardsCategory, renderCardsWord };
