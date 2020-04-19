import cardsArr from '../model/cards.js';

const cardContainer = document.querySelector('.card-container');
const gameModeCheckbox = document.querySelector('.checkbox');

const cardsCategory = cardsArr.map((el) => el.name);

const fragment = new DocumentFragment();

const renderCardsCategory = () => {
  const starContainer = document.createElement('div');
  starContainer.classList.add('star__container');

  fragment.append(starContainer);

  cardsCategory.forEach((el) => {
    const card = document.createElement('div');
    card.classList.add('card', 'cardsCategory', el, 'cardsCategoryStyle');
    if (gameModeCheckbox.checked) {
      card.classList.add('cardPlay');
    }
    card.textContent = el;

    const cardImg = document.createElement('div');
    cardImg.classList.add('card__img', `${el}__img`);

    card.append(cardImg);
    fragment.append(card);
  });

  return fragment;
};

const renderCardsWord = (category) => {
  const nameOfCategory = document.createElement('p');
  nameOfCategory.textContent = category;
  nameOfCategory.classList.add('nameOfCategory');
  fragment.append(nameOfCategory);

  const starContainer = document.createElement('div');
  starContainer.classList.add('star__container');
  fragment.append(starContainer);

  const cardsWord = cardsArr.filter((el) => el.name === category)[0].cards;
  cardsWord.forEach((el) => {
    const card = document.createElement('div');
    card.classList.add('card', 'cardsWord', el.word);

    const cardImg = document.createElement('div');
    cardImg.classList.add('card__img');
    cardImg.style.backgroundImage = el.image;

    const text = document.createElement('span');
    text.classList.add('text');
    text.textContent = el.word;

    const btn = document.createElement('button');
    btn.classList.add('button');

    if (gameModeCheckbox.checked) {
      text.classList.add('hidden');
      card.classList.add('cardPlay');
      btn.classList.add('hidden');
    }
    card.append(text);
    card.append(btn);
    card.append(cardImg);
    fragment.append(card);
  });

  const buttonGameContainer = document.createElement('div');
  const buttonGame = document.createElement('button');
  buttonGameContainer.classList.add('button-Game__Container');
  buttonGame.classList.add('button-Game');
  buttonGame.textContent = 'Start game';

  if (!gameModeCheckbox.checked) {
    buttonGameContainer.classList.add('hidden');
    buttonGame.classList.add('hidden');
  }
  buttonGameContainer.append(buttonGame);
  fragment.append(buttonGameContainer);

  return fragment;
};

const cleanContainer = () => {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
};

export { renderCardsCategory, renderCardsWord, cleanContainer };
