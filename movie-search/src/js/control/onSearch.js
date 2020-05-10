import { translateWord, fetchData, fetchDataId } from '../model/fetchData';
import { clearSwiperWrapper } from '../view/clearSwiperWrapper';
import { renderSwiperSlides } from '../view/renderSwiperSlides';

export const onSearch = async (mySwiper) => {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const spinner = document.querySelector('.spinner');
  const searchInput = document.querySelector('.search');
  const answer = document.querySelector('.answer');

  event.preventDefault();
  spinner.classList.remove('hidden');
  if (!searchInput.value) {
    answer.textContent = `Enter a word or phrase to search`;
  } else if (searchInput.value.search(/[A-z0-1]/) >= 0 && searchInput.value.search(/[А-я]/) < 0) {
    try {
      const data = await fetchData(searchInput.value, 1);
      const dataIdArray = await Promise.all(data.Search.map((el) => fetchDataId(el.imdbID)));
      const slidesFragment = await renderSwiperSlides(data, dataIdArray);

      spinner.classList.add('hidden');

      swiperWrapper.classList.add('opacity');

      swiperWrapper.classList.remove('opacity');

      clearSwiperWrapper();
      swiperWrapper.append(slidesFragment);
      mySwiper.slideTo(0);
      answer.textContent = ``;
      setTimeout(() => {
        swiperWrapper.classList.add('opacity');
      }, 300);
      return searchInput.value;
    } catch (err) {
      answer.textContent = `No results for "${searchInput.value}"`;
    }
  } else if (searchInput.value.search(/[А-я0-1]/) >= 0 && searchInput.value.search(/[A-z]/) < 0) {
    const translate = await translateWord(searchInput.value);
    try {
      const data = await fetchData(translate, 1);
      const dataIdArray = await Promise.all(data.Search.map((el) => fetchDataId(el.imdbID)));
      const slidesFragment = await renderSwiperSlides(data, dataIdArray);
      swiperWrapper.classList.remove('opacity');
      clearSwiperWrapper();
      swiperWrapper.append(slidesFragment);
      mySwiper.slideTo(0);
      answer.textContent = `"Showing results for ${translate.text}`;
      setTimeout(() => {
        swiperWrapper.classList.add('opacity');
      }, 300);
    } catch (err) {
      answer.textContent = `No results for "${searchInput.value}"`;
    }
  } else {
    answer.textContent = `No results for "${searchInput.value}"`;
  }
  spinner.classList.add('hidden');
};
