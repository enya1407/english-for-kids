import { fetchDataCity, fetchDataWeather, fetchDataGeocoding } from './model/fetchData';
import { renderWeather } from './view/renderWeather';
import { clearPages } from './view/clearPages';

let lang = localStorage.getItem('lang') || 'en';
let deg = localStorage.getItem('deg') || 'C';
let currentCity, currentCountry;

const wrapper = document.querySelector('.wrapper');
const wrapperSpinner = document.querySelector('.wrapper__spinner');
const backgroundBtn = document.querySelector('.background-btn');
const arrowSpinning = document.querySelector('.bi-arrow-repeat');
const languageButton = document.querySelector('#languageButton');
const dropdownMenu = document.querySelector('.dropdown-menu');
const changeDeg = document.querySelector('.btn-group');
const celsius = document.querySelector('#celsius');

const formControl = document.querySelector('.form-control');
const formSearch = document.querySelector('.form-search');

const weatherContainer = document.querySelector('.weather__container');

window.addEventListener('DOMContentLoaded', async () => {
  const dataCity = await fetchDataCity();
  currentCity = dataCity.city;
  currentCountry = dataCity.country;

  const weatherFragment = await renderWeather(currentCity, currentCountry, lang, deg);
  weatherContainer.append(weatherFragment);
  console.log(await fetchDataGeocoding(currentCity));
  // await ready();
  languageButton.textContent = lang.toUpperCase();
  document.getElementById(`${lang}`).classList.add('active');

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
      const weatherFragment = await renderWeather(currentCity, currentCountry, lang, deg);
      clearPages();

      weatherContainer.append(weatherFragment);
    }
  }
});

changeDeg.addEventListener('click', async (event) => {
  const temp = document.querySelector('.temp');
  console.log(temp, deg);
  if (event.target.id == 'fahrenheit' && deg == 'C') {
    deg = 'F';
    const weatherFragment = await renderWeather(currentCity, currentCountry, lang, deg);
    clearPages();

    weatherContainer.append(weatherFragment);
  }
  if (event.target.id == 'celsius' && deg == 'F') {
    deg = 'C';
    const weatherFragment = await renderWeather(currentCity, currentCountry, lang, deg);
    clearPages();

    weatherContainer.append(weatherFragment);
  }
});

formSearch.addEventListener('submit', async () => {
  try {
    clearPages();
    const weatherFragment = await renderWeather(formControl.value, currentCountry, lang, deg);

    weatherContainer.append(weatherFragment);
    currentCity = formControl.value;
  } catch (err) {}
});

// ymaps.ready(init);
// function init() {
//   // Создание карты.
//   var myMap = new ymaps.Map('map', {
//     // Координаты центра карты.
//     // Порядок по умолчанию: «широта, долгота».
//     // Чтобы не определять координаты центра карты вручную,
//     // воспользуйтесь инструментом Определение координат.
//     center: [55.76, 37.64],
//     // Уровень масштабирования. Допустимые значения:
//     // от 0 (весь мир) до 19.
//     zoom: 7,
//   });
// }

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken =
  'pk.eyJ1IjoiZW55YTE0MDciLCJhIjoiY2thcWdtb2xvMDA2ZzJ3bzVsMHlzZ2pxeCJ9.kA73NaNn18zEyyYvpy6hHg';
var map = new mapboxgl.Map({
  container: 'map',
  center: [55.76, 37.64],
  style: 'mapbox://styles/mapbox/streets-v11',
  hash: true,
  zoom: 8,
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('lang', lang);
  localStorage.setItem('deg', deg);
});
