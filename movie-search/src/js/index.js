import { renderSwiperSlides, initSwiper, clearSwiperWrapper } from './view/render';
import { translateWord } from './model/fetchData';

// spinner.classList.remove('hidden');
const submit = document.querySelector('.submit');
const search = document.querySelector('.search');
const answer = document.querySelector('.answer');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const spinner = document.querySelector('.btn-primary');

async function init() {
  const slidesFragment = await renderSwiperSlides('terminator');
  swiperWrapper.append(slidesFragment);
  spinner.classList.add('hidden');
  return initSwiper();
}

init();

submit.addEventListener('click', async () => {
  event.preventDefault();
  spinner.classList.remove('hidden');

  if (search.value.search(/[А-я]/)) {
    try {
      const fragment = await renderSwiperSlides(search.value);
      clearSwiperWrapper();
      swiperWrapper.append(fragment);
      answer.textContent = ``;
    } catch (err) {
      answer.textContent = `No results for "${search.value}"`;
    }
  } else if (search.value.search(/[A-z][А-я]/)) {
    const translate = await translateWord(search.value);
    try {
      const fragment = await renderSwiperSlides(translate.text);
      clearSwiperWrapper();
      swiperWrapper.append(fragment);
      answer.textContent = `"Showing results for ${translate.text}`;
    } catch (err) {
      answer.textContent = `No results for "${search.value}"`;
    }
  } else {
    answer.textContent = `No results for "${search.value}"`;
  }
  spinner.classList.add('hidden');
});
