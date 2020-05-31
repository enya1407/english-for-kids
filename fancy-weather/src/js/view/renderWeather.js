import { fetchDataCity, fetchDataWeather, fetchDataGeocoding } from '../model/fetchData';
import { MAP } from '../translation';
import { celsiusToFahrenheitConverter } from '../helper';

export const renderWeather = async (city, lang, deg) => {
  const fragment = new DocumentFragment();

  const Weather = await fetchDataWeather(city, lang);
  console.log(Weather, 'weather');

  const country = Weather.city.country;
  const timeAndDate = new Date();
  const dayWeekShort = MAP[lang].short[timeAndDate.getDay()];
  const day = timeAndDate.getDate();
  const month = MAP[lang].month[timeAndDate.getMonth()];
  const year = timeAndDate.getFullYear();

  const userLocation = document.createElement('div');
  userLocation.classList.add('user-location');

  const userLocationPlace = document.createElement('div');
  userLocationPlace.classList.add('user-location__place');
  userLocationPlace.textContent = `${Weather.city.name}, ${country}`;
  userLocation.append(userLocationPlace);

  const userLocationDate = document.createElement('div');
  userLocationDate.classList.add('user-location__date');
  userLocationDate.textContent = `${dayWeekShort} ${day} ${month} ${year} `;
  userLocation.append(userLocationDate);

  const userLocationTime = document.createElement('span');
  userLocationTime.classList.add('user-location__time');
  userLocationTime.textContent = new Date().toLocaleTimeString();
  userLocationDate.append(userLocationTime);

  const weather = document.createElement('div');
  weather.classList.add('weather');

  const weatherToday = document.createElement('div');
  weatherToday.classList.add('weather__today');
  weather.append(weatherToday);

  const temp = document.createElement('div');
  temp.classList.add('temp');
  const tempCelsius = Math.round(Weather.list[0].main.temp);
  if (deg === 'C') {
    temp.textContent = `${tempCelsius}°C`;
  } else {
    temp.textContent = `${Math.round(celsiusToFahrenheitConverter(tempCelsius))}°F`;
  }

  weatherToday.append(temp);

  const otherInformation = document.createElement('div');
  otherInformation.classList.add('other-information');
  weatherToday.append(otherInformation);

  const weatherDescription = document.createElement('p');
  weatherDescription.classList.add('weather-description');
  weatherDescription.textContent = ``;
  otherInformation.append(weatherDescription);

  const weatherFeels = document.createElement('p');
  weatherFeels.classList.add('weather-feels');
  weatherFeels.textContent = `${MAP[lang].other[4]}`;
  otherInformation.append(weatherFeels);

  const wind = document.createElement('p');
  wind.classList.add('wind');
  wind.textContent = `${MAP[lang].other[5]} ${Math.round(Weather.list[0].wind.speed)}${
    MAP[lang].other[6]
  }`;
  otherInformation.append(wind);

  const humidity = document.createElement('p');
  humidity.classList.add('humidity');
  humidity.textContent = `${MAP[lang].other[7]} ${Weather.list[0].main.humidity}%`;
  otherInformation.append(humidity);

  const weatherThreeDays = document.createElement('div');
  weatherThreeDays.classList.add('weather__three-days');
  weather.append(weatherThreeDays);

  fragment.append(userLocation);
  fragment.append(weather);

  return fragment;
};
