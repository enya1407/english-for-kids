export const renderSwiperSlides = (data, dataIdArray) => {
  const fragment = new DocumentFragment();

  data.Search.forEach((el, idx) => {
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = el.Title;

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = el.Year;

    const imdbRating = document.createElement('p');
    imdbRating.classList.add('card-text', 'imdb-rating');
    imdbRating.textContent = dataIdArray[idx].imdbRating;

    const slideBody = document.createElement('div');
    slideBody.classList.add('card-body');
    slideBody.append(cardText);
    slideBody.append(imdbRating);

    const linkFilm = document.createElement('a');
    linkFilm.classList.add('linkFilm');
    linkFilm.setAttribute('href', `https://www.imdb.com/title/${el.imdbID}/videogallery/`);
    linkFilm.setAttribute('target', '_blank');
    linkFilm.append(title);

    const slideImg = document.createElement('img');
    slideImg.classList.add('card-img-top');
    if (el.Poster === 'N/A') {
      slideImg.classList.add('no-poster');
    } else {
      slideImg.setAttribute('src', el.Poster);
    }

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'card');
    slide.append(linkFilm);
    slide.append(slideImg);
    slide.append(slideBody);

    fragment.append(slide);
  });

  return fragment;
};
