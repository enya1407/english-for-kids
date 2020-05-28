import { fetchDataCity, fetchDataWeather, fetchDataGeocoding } from './model/fetchData';
import { renderPages } from './view/renderPages';
import { clearPages } from './view/clearPages';

const main = document.querySelector('.main');
const mainSpinner = document.querySelector('.main__spinner');
const backgroundBtn = document.querySelector('.background-btn');
const arrowSpinning = document.querySelector('.bi-arrow-repeat');
const languageButton = document.querySelector('#languageButton');
const dropdownMenu = document.querySelector('.dropdown-menu');
const btnSearch = document.querySelector('.btn-search');
const formControl = document.querySelector('.form-control');

const weatherContainer = document.querySelector('.weather__container');

backgroundBtn.addEventListener('click', () => {
  arrowSpinning.classList.add('spinning');
  setTimeout(() => {
    arrowSpinning.classList.remove('spinning');
  }, 500);
});

dropdownMenu.addEventListener('click', (event) => {
  if (event.target.classList.contains('dropdown-item')) {
    dropdownMenu.querySelectorAll('.dropdown-item').forEach((el) => el.classList.remove('active'));
    event.target.classList.add('active');
    languageButton.textContent = event.target.textContent;
  }
});

btnSearch.addEventListener('click', async () => {
  console.log(1);

  try {
    const weatherFragment = await renderPages(formControl.value);
    clearPages();

    weatherContainer.append(weatherFragment);
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

window.addEventListener('DOMContentLoaded', async () => {
  const city = await fetchDataCity();
  // console.log(Geolocation.city);
  const weatherFragment = await renderPages(city.city);
  weatherContainer.append(weatherFragment);
  console.log(await fetchDataGeocoding(city.city));
  // await ready();
  main.classList.remove('hidden');
  mainSpinner.classList.add('hidden');
});

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
