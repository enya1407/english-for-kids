import { getInitialState } from '../helper.js';

const statisticsRepository =
  JSON.parse(localStorage.getItem('statisticsRepository')) || getInitialState();

const enlargeСounter = (word, currentEvent) => {
  statisticsRepository[word][currentEvent] += 1;
};

const beforeunloadHandler = () => {
  localStorage.setItem('statisticsRepository', JSON.stringify(getInitialState()));

  window.removeEventListener('beforeunload', beforeunloadHandler);
};

window.addEventListener('click', (evt) => {
  const resetButton = document.querySelector('.reset__button');
  if (evt.target !== resetButton) return;
  document.querySelectorAll('.reset').forEach((el) => {
    const cell = el;
    cell.textContent = '0';
  });

  window.addEventListener('beforeunload', beforeunloadHandler);
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('statisticsRepository', JSON.stringify(statisticsRepository));
});

export { statisticsRepository, enlargeСounter };
