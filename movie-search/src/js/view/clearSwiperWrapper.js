export const clearSwiperWrapper = () => {
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  while (swiperWrapper.firstChild) {
    swiperWrapper.removeChild(swiperWrapper.firstChild);
  }
};
