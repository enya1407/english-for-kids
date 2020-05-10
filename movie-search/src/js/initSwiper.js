import Swiper from 'swiper';
import { fetchData, fetchDataId } from './model/fetchData';
import { renderSwiperSlides } from './view/renderSwiperSlides';

export const initSwiper = (currentName) => {
  const spinner = document.querySelector('.spinner');
  const answer = document.querySelector('.answer');
  const swiperButton = document.querySelector('.swiper-button-next');
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const mySwiper = new Swiper('.swiper-container', {
    on: {
      slideChange: onSlideChange,
    },
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 50,
    observer: true,
    grabCursor: true,
    freemode: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 70,
      },
      770: {
        slidesPerView: 2,
        spaceBetween: 55,
      },
      900: {
        slidesPerView: 2,
        spaceBetween: 120,
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 90,
      },
      1450: {
        slidesPerView: 4,
        spaceBetween: 55,
      },
      1500: {
        slidesPerView: 4,
        spaceBetween: 60,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  async function onSlideChange() {
    if (mySwiper.progress >= 0.8) {
      spinner.classList.remove('hidden');
      swiperButton.classList.add('swiper-button-disabled');
      currentName.page += 1;
      try {
        const data = await fetchData(currentName.name, currentName.page);
        if (data.Error === 'Movie not found!') {
          swiperButton.classList.remove('swiper-button-disabled');
          if (mySwiper.progress >= 1) {
            swiperButton.classList.add('swiper-button-disabled');
            answer.textContent = answer.textContent = `no more results for "${currentName.name}"`;
          }
        } else if (data.Error === 'Request limit reached!') {
          answer.textContent = `Request limit reached`;
        } else {
          const dataIdArray = await Promise.all(data.Search.map((el) => fetchDataId(el.imdbID)));
          const slidesFragment = await renderSwiperSlides(data, dataIdArray);
          swiperWrapper.append(slidesFragment);
          swiperButton.classList.remove('swiper-button-disabled');
        }
      } catch (err) {
        answer.textContent = err.toString();
      }

      spinner.classList.add('hidden');
    }
  }

  return mySwiper;
};
