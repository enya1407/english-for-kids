import { renderSwiperSlides } from './view/renderSwiperSlides';
import { initSwiper } from './initSwiper';
import { onSearch } from './control/onSearch';
import { fetchData, fetchDataId } from './model/fetchData';

const submit = document.querySelector('.submit');
const answer = document.querySelector('.answer');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const spinner = document.querySelector('.spinner');

let currentName = 'terminator';
async function init() {
  spinner.classList.remove('hidden');
  try {
    const data = await fetchData('terminator', 1);
    const dataIdArray = await Promise.all(data.Search.map((el) => fetchDataId(el.imdbID)));
    const slidesFragment = await renderSwiperSlides(data, dataIdArray);
    swiperWrapper.append(slidesFragment);

    spinner.classList.add('hidden');
    swiperWrapper.classList.add('opacity');

    const mySwiper = await initSwiper();

    console.log(currentName);
    submit.addEventListener('click', () => {
      const resolved = onSearch(mySwiper);
      resolved.then((data) => {
        currentName = data;
      });

      console.log(currentName);
    });
  } catch (err) {
    spinner.classList.add('hidden');
    answer.textContent = err.message;
  }
}

init();
export default currentName;
