import { clearPage } from '../view/clearPage';
import { renderWeather } from '../view/renderWeather';
import { setTime, initIcons, formLanguage, geocodeInformation } from '../helper';
const weatherContainer = document.querySelector('.weather__container');
let intervalId;

const restartTimer = (timezone, lang) => {
  clearInterval(intervalId);
  intervalId = setTime(timezone, lang);
};

export const initPage = (weatherData, geocodeData, lang, deg) => {
  const timezone = weatherData.timezone;
  const weatherFragment = renderWeather(weatherData, geocodeData, lang, deg);
  clearPage();
  weatherContainer.append(weatherFragment);
  restartTimer(timezone, lang);
  initIcons(weatherData);
  formLanguage(lang);
  geocodeInformation(geocodeData, lang);
};
