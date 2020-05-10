import { initSwiper } from './initSwiper';
import { onSearch } from './control/onSearch';
import { fetchData, fetchDataId } from './model/fetchData';
import { renderSwiperSlides } from './view/renderSwiperSlides';

const submit = document.querySelector('.submit');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const spinner = document.querySelector('.spinner');
const answer = document.querySelector('.answer');

let currentName = { name: 'terminator', page: 1 };

async function init() {
  spinner.classList.remove('hidden');
  try {
    const data = await fetchData(currentName.name, currentName.page);
    if (data.Error === 'Request limit reached!') {
      answer.textContent = `Request limit reached`;
    } else {
      const dataIdArray = await Promise.all(data.Search.map((el) => fetchDataId(el.imdbID)));
      const slidesFragment = await renderSwiperSlides(data, dataIdArray);
      swiperWrapper.append(slidesFragment);
      swiperWrapper.classList.add('opacity');
    }
  } catch (err) {
    answer.textContent = err.toString();
  }
  const mySwiper = await initSwiper(currentName);
  spinner.classList.add('hidden');

  submit.addEventListener('click', () => {
    const resolved = onSearch(mySwiper);
    resolved.then((data) => {
      currentName.name = data;
      currentName.page = 1;
    });
  });
}

init();
