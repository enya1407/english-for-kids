import { fetchDataCity, fetchDataWeather, fetchDataGeocoding, getMap } from './model/fetchData';
import { renderWeather } from './view/renderWeather';
import { clearPages } from './view/clearPages';
import { setTime } from './helper';

let lang = localStorage.getItem('lang') || 'en';
let deg = localStorage.getItem('deg') || 'C';
let currentCity;
let intervalId;
let coords;
let geocodeData;
let myMap;

const wrapper = document.querySelector('.wrapper');
const wrapperSpinner = document.querySelector('.wrapper__spinner');
const backgroundBtn = document.querySelector('.background-btn');
const arrowSpinning = document.querySelector('.bi-arrow-repeat');
const languageButton = document.querySelector('#languageButton');
const dropdownMenu = document.querySelector('.dropdown-menu');
const changeDeg = document.querySelector('.btn-group');

const formControl = document.querySelector('.form-control');
const formSearch = document.querySelector('.form-search');

const weatherContainer = document.querySelector('.weather__container');

const restartTimer = () => {
  clearInterval(intervalId);
  intervalId = setTime();
};

window.addEventListener('DOMContentLoaded', async () => {
  const dataCity = await fetchDataCity();
  currentCity = dataCity.city;
  coords = dataCity.loc;

  myMap = await getMap(coords, lang);

  geocodeData = await fetchDataGeocoding(coords, lang);
  console.log(geocodeData, 'fetchDataGeocoding');

  const weatherFragment = await renderWeather(currentCity, lang, deg);
  weatherContainer.append(weatherFragment);
  intervalId = setTime();

  languageButton.textContent = lang.toUpperCase();
  document.getElementById(`${lang}`).classList.add('active');
  document.getElementById(`${deg}`).classList.add('active');

  wrapper.classList.remove('hidden');
  wrapperSpinner.classList.add('hidden');
});

backgroundBtn.addEventListener('click', () => {
  arrowSpinning.classList.add('spinning');
  setTimeout(() => {
    arrowSpinning.classList.remove('spinning');
  }, 500);
});

dropdownMenu.addEventListener('click', async (event) => {
  if (event.target.classList.contains('dropdown-item')) {
    dropdownMenu.querySelectorAll('.dropdown-item').forEach((el) => el.classList.remove('active'));
    event.target.classList.add('active');
    languageButton.textContent = event.target.textContent;
    if (event.target.textContent.toLowerCase() != lang) {
      lang = event.target.textContent.toLowerCase();
      const weatherFragment = await renderWeather(currentCity, lang, deg);
      clearPages();

      weatherContainer.append(weatherFragment);
      restartTimer();
    }
  }
});

changeDeg.addEventListener('click', async (event) => {
  const temp = document.querySelector('.temp');
  console.log(temp, deg);
  if (event.target.id == 'F' && deg == 'C') {
    deg = 'F';
    const weatherFragment = await renderWeather(currentCity, lang, deg);
    clearPages();

    weatherContainer.append(weatherFragment);
    restartTimer();
  }
  if (event.target.id == 'C' && deg == 'F') {
    deg = 'C';
    const weatherFragment = await renderWeather(currentCity, lang, deg);
    clearPages();

    weatherContainer.append(weatherFragment);
    restartTimer();
  }
});

formSearch.addEventListener('submit', async () => {
  event.preventDefault();
  try {
    currentCity = formControl.value;
    geocodeData = await fetchDataGeocoding(currentCity, lang);
    const { lat, lng } = geocodeData.results[0].geometry;

    myMap.panTo([lat, lng], { duration: 2000 });

    const weatherFragment = await renderWeather(currentCity, lang, deg);
    clearPages();
    weatherContainer.append(weatherFragment);
    restartTimer();
  } catch (err) {}
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('lang', lang);
  localStorage.setItem('deg', deg);
});
