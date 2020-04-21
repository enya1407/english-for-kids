import cardsArr from '../model/cards.js';
import { statisticsRepository } from '../control/statistics.js';

const cardContainer = document.querySelector('.card-container');
const gameModeCheckbox = document.querySelector('.checkbox');
const wrapperShadow = document.querySelector('.wrapper__shadow');
const message = document.querySelector('.message');
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

const renderStatisticPage = () => {
  const StatisticsPageContainer = document.createElement('div');
  StatisticsPageContainer.classList.add('statistics-Page__container');
  const headingStatistics = document.createElement('h2');
  headingStatistics.classList.add('heading__statistics');
  headingStatistics.textContent = 'Statistics';
  const resetButton = document.createElement('button');
  resetButton.classList.add('reset__button');
  resetButton.textContent = 'reset';
  const tableContainer = document.createElement('div');
  tableContainer.classList.add('table-container');
  const table = document.createElement('table');
  table.classList.add('table');

  const nameOfColumns = [
    'errors %',
    'errors',
    'correct',
    'train',
    'translation',
    'word',
    'category',
  ];
  const numberOfColumns = nameOfColumns.length;

  const renderRow = (category, word) => {
    const cellText = cardsArr[category].cards[word];
    const cellStatistics = statisticsRepository[cellText.word];
    const row = document.createElement('tr');
    row.classList.add('table-row', `row-${cellText.word}`);
    for (let i = 0; i < numberOfColumns; i += 1) {
      const cell = document.createElement('td');
      cell.classList.add('table-cell');
      if (i === 0) {
        cell.textContent = cardsArr[category].name;
      } else if (i === 1) {
        cell.textContent = cellText.word;
      } else if (i === 2) {
        cell.textContent = cellText.translation;
      } else if (i === 3) {
        cell.textContent = `${cellStatistics[0]}`;
        cell.classList.add(`train-${cellText.word}`);
        cell.classList.add(`reset`);
      } else if (i === 4) {
        cell.textContent = `${cellStatistics[1]}`;
        cell.classList.add(`correct-${cellText.word}`);
        cell.classList.add(`reset`);
      } else if (i === 5) {
        cell.textContent = `${cellStatistics[2]}`;
        cell.classList.add(`errors-${cellText.word}`);
        cell.classList.add(`reset`);
      } else if (i === 6) {
        cell.textContent =
          Math.floor(((100 * cellStatistics[2]) / (cellStatistics[1] + cellStatistics[2])) * 10) /
            10 || 0;
        cell.classList.add(`reset`);
      }

      row.append(cell);
    }
    table.append(row);
  };

  const renderHeaderRow = () => {
    const row = document.createElement('tr');
    row.classList.add('table-row');

    while (nameOfColumns.length > 0) {
      const cell = document.createElement('th');
      cell.classList.add('table-cell', 'table-head');
      cell.textContent = nameOfColumns[nameOfColumns.length - 1];
      nameOfColumns.pop();
      row.append(cell);
    }
    table.append(row);
  };

  renderHeaderRow();
  for (let i = 0; i < 8; i += 1) {
    for (let j = 0; j < 8; j += 1) {
      renderRow(i, j);
    }
  }

  tableContainer.append(table);
  StatisticsPageContainer.append(headingStatistics);
  StatisticsPageContainer.append(resetButton);
  StatisticsPageContainer.append(tableContainer);
  fragment.append(StatisticsPageContainer);

  return fragment;
};

const cleanContainer = () => {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
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

export {
  renderCardsCategory,
  renderCardsWord,
  renderStatisticPage,
  gameOver,
  madeStar,
  cleanContainer,
};
