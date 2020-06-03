import SkyconsContructor from 'skycons';
import { translation } from './translation';
import { initTime } from './control/initTime';
import { fetchDataImage } from './model/fetchDataImage';

const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal-title');
const textErr = document.querySelector('.text-Err');
const closeModal = document.querySelector('.close-modal');
const body = document.querySelector('body');

export const celsiusToFahrenheitConverter = (tempCelsius) => Math.round(tempCelsius * 1.8 + 32);

export const setTime = (timezone, lang) => {
  const timeAndDateElement = document.querySelector('.user-location__date-and-time');

  return setInterval(() => {
    timeAndDateElement.textContent = initTime(timezone, lang);
  }, 1000);
};

export const initIcons = (weatherData) => {
  const Skycons = new SkyconsContructor(window);
  const skycons = new Skycons({ color: 'white', resizeClear: true });

  skycons.add('icon0', weatherData.currently.icon);
  skycons.add('icon1', weatherData.daily.data[0].icon);
  skycons.add('icon2', weatherData.daily.data[1].icon);
  skycons.add('icon3', weatherData.daily.data[2].icon);

  skycons.play();
};

export const formLanguage = (lang) => {
  const formControl = document.querySelector('.form-control');
  const btnSearch = document.querySelector('.btn-search');

  formControl.setAttribute('placeholder', translation[lang].other[1]);
  btnSearch.textContent = translation[lang].other[0];
};

export const getDay = (timezone, offSet) => {
  const data = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: timezone,
    })
  );
  const dayWeek = data.getDay();

  const result = dayWeek + offSet;

  return result >= 7 ? result - 7 : result;
};

const degreesAtMinute = (deg) => {
  const d = Math.trunc(deg);
  const remainder = deg - d;
  const m = Math.floor(Math.abs(remainder * 60));
  const s = Math.round((Math.abs(remainder * 60) - m) * 60);
  return `${d}° ${m}' ${s}"`;
};

export const geocodeInformation = (geocodeData, lang) => {
  const latitude = document.querySelector('.latitude');
  const longitude = document.querySelector('.longitude');
  const { lat, lng } = geocodeData.results[0].geometry;

  latitude.textContent = `${translation[lang].other[2]}: ${degreesAtMinute(lat)}`;
  longitude.textContent = `${translation[lang].other[3]}: ${degreesAtMinute(lng)}`;
};

export const errorOutput = (lang, err) => {
  const message = err || translation[lang].massage;

  modalTitle.textContent = `${translation[lang].title}`;
  textErr.textContent = `${message} ${translation[lang].errText}`;
  closeModal.textContent = `${translation[lang].close}`;
  modal.classList.remove('hidden');
};

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

export const changeBackground = (url) => {
  body.style.backgroundImage = `linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%),  url("${url}")`;
};

export const getImageQuery = (weatherData) => {
  const timezone = weatherData.timezone;
  const timeAndDate = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: timezone,
    })
  );

  const hour = timeAndDate.getHours();
  let timesOfDay;
  if (hour >= 6 && hour <= 9) {
    timesOfDay = 'morning';
  } else if (hour >= 10 && hour <= 17) {
    timesOfDay = 'day';
  } else if (hour >= 18 && hour <= 20) {
    timesOfDay = 'evening';
  } else {
    timesOfDay = 'night';
  }

  const month = timeAndDate.getMonth();
  let season;
  if (month >= 2 && month <= 4) {
    season = 'spring';
  } else if (month >= 5 && month <= 7) {
    season = 'summer';
  } else if (month >= 8 && month <= 10) {
    season = 'autumn';
  } else {
    season = 'winter';
  }

  return `${season} ${timesOfDay}`;
};
