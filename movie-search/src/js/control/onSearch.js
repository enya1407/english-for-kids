import { translateWord, fetchData, fetchDataId } from '../model/fetchData';
import { clearSwiperWrapper } from '../view/clearSwiperWrapper';
import { renderSwiperSlides } from '../view/renderSwiperSlides';

export const onSearch = async (mySwiper) => {
  event.preventDefault();

  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const spinner = document.querySelector('.spinner');
  const searchInput = document.querySelector('.search');
  const answer = document.querySelector('.answer');

  const searchValue = searchInput.value;

  const haveEngSymbols = searchValue.search(/[A-z0-1]/) >= 0;
  const haveRuSymbols = searchValue.search(/[А-я0-1]/) >= 0;

  if (!searchValue) {
    answer.textContent = `Enter a word or phrase to search`;
    return;
  }
  spinner.classList.remove('hidden');

  if (haveEngSymbols) {
    try {
      const data = await fetchData(searchValue, 1);
      switch (data.Error) {
        case 'Movie not found!':
          answer.textContent = `No results for "${searchValue}"`;
          break;
        case 'Request limit reached!':
          answer.textContent = `Request limit reached`;
          break;
        case 'Too many results.':
          answer.textContent = `Too many results for "${searchValue}"`;
          break;
        default:
          answer.textContent = '';

          const dataIdArray = await Promise.all(data.Search.map((el) => fetchDataId(el.imdbID)));
          const slidesFragment = await renderSwiperSlides(data, dataIdArray);
          clearSwiperWrapper();
          swiperWrapper.append(slidesFragment);
          mySwiper.slideTo(0);
          spinner.classList.add('hidden');
          return searchValue;
      }
    } catch (err) {
      answer.textContent = err.toString();
    }
  } else if (haveRuSymbols) {
    const translate = await translateWord(searchValue);
    try {
      const data = await fetchData(translate.text, 1);

      switch (data.Error) {
        case 'Movie not found!':
          answer.textContent = `No results for "${searchValue}"`;
          break;
        case 'Request limit reached!':
          answer.textContent = `Request limit reached`;
          break;
        case 'Too many results.':
          answer.textContent = `Too many results for "${searchValue}"`;
          break;
        default:
          answer.textContent = `Showing results for ${translate.text}`;

          const dataIdArray = await Promise.all(data.Search.map((el) => fetchDataId(el.imdbID)));
          const slidesFragment = await renderSwiperSlides(data, dataIdArray);
          clearSwiperWrapper();
          swiperWrapper.append(slidesFragment);
          mySwiper.slideTo(0);
          spinner.classList.add('hidden');
          return translate.text;
      }
    } catch (err) {
      answer.textContent = err.toString();
    }
  }

  spinner.classList.add('hidden');
};
