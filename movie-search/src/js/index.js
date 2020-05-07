import { renderSwiperSlides, initSwiper, clearSwiperWrapper } from './view/render';
import { translateWord } from './model/fetchData';

const submit = document.querySelector('.submit');
const search = document.querySelector('.search');
const answer = document.querySelector('.answer');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const spinner = document.querySelector('.btn-primary');

async function init() {
  const slidesFragment = await renderSwiperSlides('terminator', 1);
  swiperWrapper.append(slidesFragment);

  spinner.classList.add('hidden');
  return initSwiper();
}

init();

submit.addEventListener('click', async () => {
  event.preventDefault();
  spinner.classList.remove('hidden');

  if (search.value.search(/[0-9А-я]/)) {
    // console.log(search.value);
    try {
      const fragment = await renderSwiperSlides(search.value, 1);
      clearSwiperWrapper();
      swiperWrapper.append(fragment);
      answer.textContent = ``;
    } catch (err) {
      answer.textContent = `No results for "${search.value}"`;
    }
  } else if (search.value.search(/[0-9A-z][0-9А-я]/)) {
    const translate = await translateWord(search.value);
    try {
      const fragment = await renderSwiperSlides(translate.text, 1);
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
