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

function shuffle(arr) {
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
}

export { playAudio, findTranslation, shuffle };
