import { renderCardsCategory, renderCardsWord, cleanContainer } from '../view/renderCards.js';
import { playAudio, findTranslation } from '../helper.js';

const cardContainer = document.querySelector('.card-container');
const gameModeCheckbox = document.querySelector('.checkbox');
const gameModToggle = document.querySelector('.slider');

let onMainPage = true;

// кнопка
gameModToggle.addEventListener('click', () => {
  if (document.querySelectorAll('.card')[0].classList[1] === 'cardsCategory') {
    if (!gameModeCheckbox.checked) {
      document.querySelectorAll('.card').forEach((el) => el.classList.add('cardPlay'));
    } else {
      document.querySelectorAll('.card').forEach((el) => el.classList.remove('cardPlay'));
    }
  }
  if (!gameModeCheckbox.checked) {
    document.querySelectorAll('.card').forEach((el) => el.classList.add('cardPlay'));
    document.querySelectorAll('.card>span').forEach((el) => {
      el.classList.add('transparent');
      document.querySelectorAll('.button').forEach((elem) => {
        elem.classList.add('hidden');
      });
    });
  } else {
    document.querySelectorAll('.card').forEach((el) => el.classList.remove('cardPlay'));
    document.querySelectorAll('.card>span').forEach((el) => {
      el.classList.remove('transparent');
    });
    document.querySelectorAll('.button').forEach((el) => {
      el.classList.remove('hidden');
    });
  }
});

// переход к категориям
document.addEventListener('click', (evt) => {
  const closest = evt.target.closest('.cardsCategory');
  const category = closest ? closest.classList[2] : null;

  if (category) {
    cleanContainer();
    if (category === 'Main-Page') {
      onMainPage = true;
      cardContainer.append(renderCardsCategory());
    } else {
      onMainPage = false;
      cardContainer.append(renderCardsWord(category));
    }
  }
});

// train
cardContainer.addEventListener('click', (evt) => {
  if (onMainPage) return;
  const card = evt.target.closest('.cardsWord');
  if (!card) return;

  const word = card.classList[2];
  const text = card.querySelector('.text');
  const nameOfCategory = document.querySelector('.nameOfCategory').textContent;

  const flipBack = () => {
    card.classList.remove('animation');
    evt.target.classList.remove('hidden');
    text.textContent = word;
  };

  if (evt.target.classList[0] === 'button') {
    card.classList.add('animation');
    evt.target.classList.add('hidden');
    text.textContent = findTranslation(nameOfCategory, word);

    const onMouseleave = () => {
      flipBack();

      card.removeEventListener('mouseleave', onMouseleave);
    };

    card.addEventListener('mouseleave', onMouseleave);
  } else if (!gameModeCheckbox.checked) {
    playAudio(nameOfCategory, word);
  }
});
