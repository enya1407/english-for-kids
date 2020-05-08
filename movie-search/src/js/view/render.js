import Swiper from 'swiper';
import { fetchData, fetchDataId } from './../model/fetchData';

const swiperWrapper = document.querySelector('.swiper-wrapper');
const spinner = document.querySelector('.btn-primary');
const swiperButtonNext = document.querySelector('.swiper-button-next');
const answer = document.querySelector('.answer');
let currentSwiperDataName, currentSwiperDataPage, currentSwiperDataIndex;

export const renderSwiperSlides = async (name) => {
  console.log(currentSwiperDataName, currentSwiperDataPage, currentSwiperDataIndex);
  currentSwiperDataName = `${name}`;
  currentSwiperDataPage = 2;
  currentSwiperDataIndex = 0;
  console.log(currentSwiperDataName, currentSwiperDataPage, currentSwiperDataIndex);
  const fragment = new DocumentFragment();
  const data = await fetchData(name, 1);
  const moveCount = data.Search.length;
  console.log(moveCount);
  for (let i = 0; i < moveCount; i += 1) {
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
    // console.log(data.Search[i].Poster);
    if (data.Search[i].Poster === 'N/A') {
      slideImg.classList.add('no-poster');
    } else {
      slideImg.setAttribute('src', `${data.Search[i].Poster}`);
    }
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

  return fragment;
};

const renderSlide = async (name, page, el) => {
  const fragment = new DocumentFragment();
  const data = await fetchData(name, page);

  const id = data.Search[el].imdbID;
  const DataId = await fetchDataId(id);
  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = `${data.Search[el].Title}`;
  const linkFilm = document.createElement('a');
  linkFilm.classList.add('linkFilm');
  linkFilm.setAttribute('href', `https://www.imdb.com/title/${id}/videogallery/`);
  linkFilm.setAttribute('target', '_blank');
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide', 'card');
  const slideImg = document.createElement('img');
  const slideBody = document.createElement('div');
  slideImg.classList.add('card-img-top');
  if (data.Search[el].Poster === 'N/A') {
    slideImg.classList.add('no-poster');
  } else {
    slideImg.setAttribute('src', `${data.Search[el].Poster}`);
  }
  slideBody.classList.add('card-body');
  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.textContent = `${data.Search[el].Year}`;
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

  return fragment;
};

export const clearSwiperWrapper = () => {
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  while (swiperWrapper.firstChild) {
    swiperWrapper.removeChild(swiperWrapper.firstChild);
  }
};
const slideLoading = () => {
  swiperButtonNext.addEventListener('click', async () => {
    spinner.classList.remove('hidden');

    currentSwiperDataIndex += 1;
    if (currentSwiperDataIndex >= 10) {
      currentSwiperDataPage += 1;
      currentSwiperDataIndex = 0;
    }
    try {
      const fragment = await renderSlide(
        currentSwiperDataName,
        currentSwiperDataPage,
        currentSwiperDataIndex
      );

      swiperWrapper.append(fragment);
      spinner.classList.add('hidden');
    } catch (err) {
      spinner.classList.add('hidden');
      if (err == "TypeError: Cannot read property '0' of undefined") {
        answer.textContent = `No results for "${search.value}"`;
      } else {
        answer.textContent = err.message;
      }
    }
  });
};
export const initSwiper = () => {
  return new Swiper('.swiper-container', {
    on: {
      slideChange: slideLoading(),
    },
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 50,
    observer: true,
    grabCursor: true,
    // slidesOffsetBefore: 30,
    // slidesOffsetAfter: 50,
    freemode: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 50,
      },
      800: {
        slidesPerView: 2,
        spaceBetween: 70,
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 60,
      },
    },
    dynamicBullets: true,
    dynamicMainBu: 10,
    // effect: 'coverflow',
    // watchOverflow: true,
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    //   dynamicBullets: true,
    //   dynamicMainBullets: 10,
    // },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
};
