import { renderSwiperSlides, initSwiper, clearSwiperWrapper } from './view/render';
import { translateWord } from './model/fetchData';

const submit = document.querySelector('.submit');
const search = document.querySelector('.search');
const answer = document.querySelector('.answer');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const spinner = document.querySelector('.btn-primary');

async function init() {
  spinner.classList.remove('hidden');
  try {
    const slidesFragment = await renderSwiperSlides('terminator');
    swiperWrapper.append(slidesFragment);

    spinner.classList.add('hidden');
    swiperWrapper.classList.add('opacity');
    return initSwiper();
  } catch (err) {
    spinner.classList.add('hidden');
    if (err == "TypeError: Cannot read property '0' of undefined") {
      answer.textContent = `No results for "${search.value}"`;
    } else {
      answer.textContent = err.message;
    }
  }
}
init();

submit.addEventListener('click', async () => {
  event.preventDefault();
  spinner.classList.remove('hidden');
  if (!search.value) {
    answer.textContent = `Enter a word or phrase to search`;
  } else if (search.value.search(/[А-я]/)) {
    try {
      const fragment = await renderSwiperSlides(search.value);
      initSwiper();
      swiperWrapper.classList.remove('opacity');
      clearSwiperWrapper();

      swiperWrapper.append(fragment);

      answer.textContent = ``;
      setTimeout(() => {
        swiperWrapper.classList.add('opacity');
      }, 300);
    } catch (err) {
      if (err == "TypeError: Cannot read property '0' of undefined") {
        answer.textContent = `No results for "${search.value}"`;
      } else {
        answer.textContent = err.message;
      }
    }
  } else if (search.value.search(/[A-z][А-я]/)) {
    const translate = await translateWord(search.value);
    try {
      const fragment = await renderSwiperSlides(translate.text);
      initSwiper();
      swiperWrapper.classList.remove('opacity');
      clearSwiperWrapper();
      swiperWrapper.append(fragment);
      answer.textContent = `"Showing results for ${translate.text}`;
      setTimeout(() => {
        swiperWrapper.classList.add('opacity');
      }, 300);
    } catch (err) {
      if (
        err == "TypeError: Cannot read property '0' of undefined" ||
        err == "TypeError: Cannot read property 'imdbID' of undefined"
      ) {
        answer.textContent = `No results for "${search.value}"`;
      } else {
        answer.textContent = err.message;
      }
    }
  } else {
    if (err === "TypeError: Cannot read property '0' of undefined") {
      answer.textContent = `No results for "${search.value}"`;
    } else {
      answer.textContent = err;
    }
  }
  spinner.classList.add('hidden');
});
