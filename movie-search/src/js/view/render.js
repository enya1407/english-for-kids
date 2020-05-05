import Swiper from 'swiper';
import { fetchData, fetchDataId } from './../model/fetchData';

export const initSwiper = () => {
  return new Swiper('.swiper-container', {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 30,
    observer: true,
    // slidesOffsetBefore: 30,
    // slidesOffsetAfter: 50,
    breakpoints: {
      790: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1850: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
    dynamicBullets: true,
    dynamicMainBu: 10,
    // effect: 'coverflow',
    // watchOverflow: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 10,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
};

export const renderSwiperSlides = async (name) => {
  const fragment = new DocumentFragment();
  const data = await fetchData(name);
  for (let i = 0; i < 10; i += 1) {
    const id = data.Search[i].imdbID;
    const DataId = await fetchDataId(id);

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = `${data.Search[i].Title}`;
    const linkFilm = document.createElement('a');
    linkFilm.classList.add('linkFilm');
    linkFilm.setAttribute('href', `https://www.imdb.com/title/${id}/videogallery/`);
    linkFilm.setAttribute('target', '_blank');
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'card');
    const slideImg = document.createElement('img');
    const slideBody = document.createElement('div');
    slideImg.classList.add('card-img-top');
    slideImg.setAttribute('src', `${data.Search[i].Poster}`);
    slideBody.classList.add('card-body');
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = `${data.Search[i].Year}`;
    const imdbRating = document.createElement('p');
    imdbRating.classList.add('card-text', 'imdb-rating');
    imdbRating.textContent = `${DataId.imdbRating}`;

    linkFilm.append(title);
    slide.append(linkFilm);
    slide.append(slideImg);
    slideBody.append(cardText);
    slideBody.append(imdbRating);
    slide.append(slideBody);
    fragment.append(slide);
  }

  // answer.textContent = '';
  return fragment;
};

export const clearSwiperWrapper = () => {
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  while (swiperWrapper.firstChild) {
    swiperWrapper.removeChild(swiperWrapper.firstChild);
  }
};
