import { playAudio, shuffle } from '../helper.js';
import cardsArr from '../model/cards.js';
import { gameOver, madeStar } from '../view/renderCards.js';

import { enlargeСounter } from './statistics.js';

const gameModeCheckbox = document.querySelector('.checkbox');
const cardContainer = document.querySelector('.card-container');

let counterErrors;
let currentNameOfCategory;
let arrWord;
let arrRandomWord;
let currentWordInTheGame;

const playCurrentAudio = () =>
  playAudio(currentNameOfCategory, arrRandomWord[currentWordInTheGame].word);

const startGame = (event) => {
  const closest = event.target.closest('.cardsWord');
  const category = closest ? closest.classList[2] : null;

  if (event.target.classList[1] === 'button-repeat') {
    event.target.classList.add('rotate');
    setTimeout(() => event.target.classList.remove('rotate'), 500);
    playCurrentAudio();
  }

  if (closest) {
    const audio = new Audio();
    if (arrRandomWord[currentWordInTheGame].word === category) {
      audio.src = '../assets/audio/correct.mp3';
      audio.play();
      madeStar('correct');
      event.target.classList.add('shadow');
      currentWordInTheGame -= 1;
      enlargeСounter(category, 1);
      if (currentWordInTheGame >= 0) {
        setTimeout(playCurrentAudio, 1000);
      } else {
        cardContainer.removeEventListener('click', startGame);
        gameOver(counterErrors);
      }
    } else if (
      arrRandomWord[currentWordInTheGame].word !== category &&
      event.target.classList[1] !== 'shadow'
    ) {
      audio.src = '../assets/audio/error.mp3';
      audio.play();
      madeStar();
      counterErrors += 1;
      enlargeСounter(category, 2);
    }
  }
};

const clearListeners = () => {
  const starContainer = document.querySelector('.star__container');

  while (starContainer.firstChild) {
    starContainer.removeChild(starContainer.firstChild);
  }

  cardContainer.removeEventListener('click', startGame);
  gameModeCheckbox.removeEventListener('click', clearListeners);
};

const onStartGameButtonClick = (evt) => {
  const cardsCategory = document.querySelector('.cardsCategory');

  if (evt.target.classList[0] === 'button-Game' && evt.target.classList[1] !== 'button-repeat') {
    const buttonGame = document.querySelector('.button-Game');

    buttonGame.classList.add('button-repeat');
    buttonGame.textContent = '';
    setTimeout(() => {
      buttonGame.style.transition = 'none';
    }, 500);

    counterErrors = 0;
    currentNameOfCategory = document.querySelector('.nameOfCategory').textContent;
    arrWord = cardsArr.filter((el) => el.name === currentNameOfCategory)[0].cards;
    arrRandomWord = shuffle(arrWord);
    currentWordInTheGame = arrRandomWord.length - 1;

    cardContainer.removeEventListener('click', startGame);
    cardContainer.addEventListener('click', startGame);

    playCurrentAudio();

    cardsCategory.addEventListener('click', clearListeners);
    gameModeCheckbox.addEventListener('click', clearListeners);
  }
};

cardContainer.addEventListener('click', onStartGameButtonClick);
