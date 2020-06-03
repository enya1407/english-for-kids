import { fetchDataGeocoding } from './model/fetchDataGeocoding';
import { fetchDataCity } from './model/fetchDataCity';
import { fetchDataWeather } from './model/fetchDataWeather';
import { fetchDataImage } from './model/fetchDataImage';

import { getMap, setPlacemark } from './model/getMaps';
import { initPage } from './control/initPage';
import { errorOutput, changeBackground, getImageQuery } from './helper';

let lang = localStorage.getItem('lang') || 'en';
let deg = localStorage.getItem('deg') || 'C';
let currentCity, coords, requestedCity, geocodeData, myMap, weatherData;
let url;

const wrapper = document.querySelector('.wrapper');
const wrapperSpinner = document.querySelector('.wrapper__spinner');
const backgroundBtn = document.querySelector('.background-btn');
const arrowSpinning = document.querySelector('.bi-arrow-repeat');
const languageButton = document.querySelector('#languageButton');
const dropdownMenu = document.querySelector('.dropdown-menu');
const changeDeg = document.querySelector('.btn-group');
const formControl = document.querySelector('.form-control');
const formSearch = document.querySelector('.form-search');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const dataCity = await fetchDataCity(lang);
    currentCity = dataCity.city;
    coords = dataCity.loc;

    myMap = await getMap(coords, lang);

    geocodeData = await fetchDataGeocoding(coords, lang);

    coords = geocodeData.results[0].geometry;

    weatherData = await fetchDataWeather(coords, lang);
    initPage(weatherData, geocodeData, lang, deg);

    url = await fetchDataImage(getImageQuery(weatherData), lang);
    changeBackground(url);
    languageButton.textContent = lang.toUpperCase();
    document.getElementById(`${lang}`).classList.add('active');
    document.getElementById(`${deg}`).classList.add('active');

    wrapper.classList.remove('hidden');
    wrapperSpinner.classList.add('hidden');
  } catch {
    return;
  }
});

backgroundBtn.addEventListener('click', async () => {
  url = await fetchDataImage(getImageQuery(weatherData), lang);
  changeBackground(url);
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

      geocodeData = await fetchDataGeocoding(`${coords.lat}, ${coords.lng}`, lang);
      initPage(weatherData, geocodeData, lang, deg);
    }
  }
});

changeDeg.addEventListener('click', async (event) => {
  const temp = document.querySelector('.temp');

  if (event.target.id == 'F' && deg == 'C') {
    deg = 'F';
  }
  if (event.target.id == 'C' && deg == 'F') {
    deg = 'C';
  }
  initPage(weatherData, geocodeData, lang, deg);
});

formSearch.addEventListener('submit', async () => {
  event.preventDefault();

  if (!formControl.value.trim()) {
    return errorOutput(lang);
  }

  wrapperSpinner.classList.remove('hidden');

  try {
    requestedCity = await fetchDataGeocoding(formControl.value, lang);

    if (!requestedCity.results.length) {
      wrapperSpinner.classList.add('hidden');

      formControl.value = '';
      return errorOutput(lang);
    }

    currentCity = formControl.value;
    geocodeData = requestedCity;

    const { lat, lng } = geocodeData.results[0].geometry;

    coords = geocodeData.results[0].geometry;
    weatherData = await fetchDataWeather(coords, lang);
    url = await fetchDataImage(getImageQuery(weatherData), lang);
    changeBackground(url);
    initPage(weatherData, geocodeData, lang, deg);
    myMap.panTo([lat, lng], { duration: 2000 });
    setPlacemark(myMap);

    formControl.value = '';
    wrapperSpinner.classList.add('hidden');
  } catch {
    formControl.value = '';
    wrapperSpinner.classList.add('hidden');
  }
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('lang', lang);
  localStorage.setItem('deg', deg);
});
