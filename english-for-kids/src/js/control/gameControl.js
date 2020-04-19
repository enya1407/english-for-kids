import { playAudio, shuffle, gameOver, madeStar } from '../helper.js';
import cardsArr from '../model/cards.js';

const cardContainer = document.querySelector('.card-container');

// const gameModeCheckbox = document.querySelector('.checkbox');

const startGame = (nameOfCategory) => {
  let counterErrors = 0;
  const arrWord = cardsArr.filter((el) => el.name === nameOfCategory)[0].cards;
  const arrRandomWord = shuffle(arrWord);
  let wordInTheGame = arrRandomWord.length - 1;

  const playAudioNow = () => playAudio(nameOfCategory, arrRandomWord[wordInTheGame].word);

  playAudioNow();

  cardContainer.addEventListener('click', (evt) => {
    const closest = evt.target.closest('.cardsWord');
    const category = closest ? closest.classList[2] : null;
    if (closest) {
      const audio = new Audio();
      if (arrRandomWord[wordInTheGame].word === category) {
        audio.src = '../assets/audio/correct.mp3';
        audio.play();
        madeStar('correct');
        evt.target.classList.add('shadow');
        wordInTheGame -= 1;
        if (wordInTheGame >= 0) {
          setTimeout(playAudioNow, 1000);
        } else {
          gameOver(counterErrors);
        }
      } else if (
        arrRandomWord[wordInTheGame].word !== category &&
        evt.target.classList[1] !== 'shadow'
      ) {
        audio.src = '../assets/audio/error.mp3';
        audio.play();
        madeStar();
        counterErrors += 1;
      }
    }
  });

  cardContainer.addEventListener('click', (evt) => {
    if (evt.target.classList[1] === 'button-repeat') {
      evt.target.classList.add('rotate');
      setTimeout(() => evt.target.classList.remove('rotate'), 500);
      playAudioNow();
    }
  });
};

export default startGame;
