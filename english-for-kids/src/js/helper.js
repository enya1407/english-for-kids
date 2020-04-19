import cardsArr from './model/cards.js';
import { renderCardsCategory, renderCardsWord, cleanContainer } from './view/renderCards.js';

const cardContainer = document.querySelector('.card-container');
const wrapperShadow = document.querySelector('.wrapper__shadow');
const message = document.querySelector('.message');

const playAudio = (nameOfCategory, word) => {
  const [categoryObj] = cardsArr.filter((el) => el.name === nameOfCategory);
  const [cardObj] = categoryObj.cards.filter((el) => el.word === word);
  const { audioSrc } = cardObj;
  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = audioSrc;
  audio.play();
};

const findTranslation = (nameOfCategory, word) => {
  return cardsArr
    .filter((el) => el.name === nameOfCategory)[0]
    .cards.filter((el) => el.word === word)[0].translation;
};

const shuffle = (arr) => {
  const result = [...arr];
  let j;
  let temp;
  for (let i = result.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = result[j];
    result[j] = result[i];
    result[i] = temp;
  }
  return result;
};

const gameOver = (counterErrors) => {
  const audio = new Audio();
  if (counterErrors === 0) {
    wrapperShadow.classList.add('winner');
    message.textContent = `Win!`;
    message.classList.remove('hidden');
    setTimeout(() => {
      wrapperShadow.classList.remove('winner');
      message.classList.add('hidden');
    }, 3000);
    audio.src = '../assets/audio/success.mp3';
  } else {
    wrapperShadow.classList.add('loser');
    message.textContent = `${counterErrors} errors`;
    message.classList.remove('hidden');
    setTimeout(() => {
      wrapperShadow.classList.remove('loser');
      message.classList.add('hidden');
    }, 3000);
    audio.src = '../assets/audio/failure.mp3';
  }
  audio.play();
  cleanContainer();
  cardContainer.append(renderCardsCategory());
};

const madeStar = (res) => {
  const star = document.createElement('div');
  star.classList.add('star');
  if (res === 'correct') {
    star.classList.add('correct');
  } else {
    star.classList.add('incorrect');
  }

  document.querySelector('.star__container').append(star);
};

export { playAudio, findTranslation, shuffle, gameOver, madeStar };
