import cardsArr from './model/cards.js';

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

export { playAudio, findTranslation };
