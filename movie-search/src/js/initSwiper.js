import Swiper from 'swiper';
import { fetchData, fetchDataId } from './model/fetchData';
import { renderSwiperSlides } from './view/renderSwiperSlides';
import currentName from './index';

export const initSwiper = () => {
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
      700: {
        slidesPerView: 2,
        spaceBetween: 70,
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 90,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 70,
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
    let page = 0;
    if (mySwiper.progress >= 0.8) {
      page += 1;
      console.log(page, currentName);
      const data = await fetchData(currentName, page);
      const dataIdArray = await Promise.all(data.Search.map((el) => fetchDataId(el.imdbID)));
      const slidesFragment = await renderSwiperSlides(data, dataIdArray);
      swiperWrapper.append(slidesFragment);
    }
  }

  return mySwiper;
};
