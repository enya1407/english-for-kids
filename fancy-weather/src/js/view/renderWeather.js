import { translation } from '../translation';
import { celsiusToFahrenheitConverter, getDay } from '../helper';
import { initTime } from '../control/initTime';

export const renderWeather = (weatherData, geocodeData, lang, deg) => {
  const fragment = new DocumentFragment();

  const country = geocodeData.results[0].components.country;
  const city = geocodeData.results[0].components.city || geocodeData.results[0].components.state;
  const timezone = weatherData.timezone;
  const timeAndDate = initTime(timezone, lang);

  const userLocation = document.createElement('div');
  userLocation.classList.add('user-location');

  const userLocationPlace = document.createElement('div');
  userLocationPlace.classList.add('user-location__place');
  userLocationPlace.textContent = city ? `${city}, ${country}` : country;
  userLocation.append(userLocationPlace);

  const userLocationDateAndTime = document.createElement('div');
  userLocationDateAndTime.classList.add('user-location__date-and-time');
  userLocationDateAndTime.textContent = `${timeAndDate}`;
  userLocation.append(userLocationDateAndTime);

  const weatherElement = document.createElement('div');
  weatherElement.classList.add('weather');

  const weatherToday = document.createElement('div');
  weatherToday.classList.add('weather__today');
  weatherElement.append(weatherToday);

  const temp = document.createElement('div');
  temp.classList.add('temp');
  const tempCelsius = Math.round(weatherData.currently.temperature);
  deg === 'C'
    ? (temp.textContent = `${tempCelsius}°C`)
    : (temp.textContent = `${celsiusToFahrenheitConverter(tempCelsius)}°F`);
  weatherToday.append(temp);

  const otherInformation = document.createElement('div');
  otherInformation.classList.add('other-information');
  weatherToday.append(otherInformation);

  const weatherDescription = document.createElement('p');
  weatherDescription.classList.add('weather-description');
  weatherDescription.textContent = `${translation[lang].weather[`${weatherData.currently.icon}`]}`;
  otherInformation.append(weatherDescription);

  const icon0 = document.createElement('canvas');
  icon0.classList.add('icon0');
  icon0.id = 'icon0';
  icon0.width = 128;
  icon0.height = 128;
  otherInformation.append(icon0);

  const weatherFeels = document.createElement('p');
  weatherFeels.classList.add('weather-feels');
  const tempCelsiusFeels = Math.round(weatherData.currently.apparentTemperature);
  deg === 'C'
    ? (weatherFeels.textContent = `${translation[lang].other[4]} ${tempCelsiusFeels}°C`)
    : (weatherFeels.textContent = `${translation[lang].other[4]} ${celsiusToFahrenheitConverter(
        tempCelsiusFeels
      )}°F`);
  otherInformation.append(weatherFeels);

  const wind = document.createElement('p');
  wind.classList.add('wind');
  wind.textContent = `${translation[lang].other[5]} ${Math.round(weatherData.currently.windSpeed)}${
    translation[lang].other[6]
  }`;
  otherInformation.append(wind);

  const humidity = document.createElement('p');
  humidity.classList.add('humidity');
  humidity.textContent = `${translation[lang].other[7]} ${Math.round(
    weatherData.currently.humidity * 100
  )} %`;
  otherInformation.append(humidity);

  const weatherThreeDays = document.createElement('div');
  weatherThreeDays.classList.add('weather__three-days');
  weatherElement.append(weatherThreeDays);

  const firstDay = document.createElement('div');
  firstDay.classList.add('first-day', 'day');
  weatherThreeDays.append(firstDay);

  const firstDayName = document.createElement('p');
  firstDayName.classList.add('first-day__name', 'name-day');
  firstDayName.textContent = translation[lang].week[getDay(timezone, 1)];
  firstDay.append(firstDayName);

  const firstDayTemp = document.createElement('p');
  firstDayTemp.classList.add('first-day__temp', 'temp-day');
  const tempCelsiusFirstDay = Math.round(
    (weatherData.daily.data[0].temperatureHigh + weatherData.daily.data[0].temperatureLow) / 2
  );
  deg === 'C'
    ? (firstDayTemp.textContent = `${tempCelsiusFirstDay}°C`)
    : (firstDayTemp.textContent = `${celsiusToFahrenheitConverter(tempCelsiusFirstDay)}°F`);
  firstDay.append(firstDayTemp);

  const icon1 = document.createElement('canvas');
  icon1.classList.add('icon1');
  icon1.id = 'icon1';
  icon1.width = 100;
  icon1.height = 100;
  firstDay.append(icon1);

  const secondDay = document.createElement('div');
  secondDay.classList.add('second-day', 'day');
  weatherThreeDays.append(secondDay);

  const secondDayName = document.createElement('p');
  secondDayName.classList.add('second-day__name', 'name-day');
  secondDayName.textContent = translation[lang].week[getDay(timezone, 2)];
  secondDay.append(secondDayName);

  const secondDayTemp = document.createElement('p');
  secondDayTemp.classList.add('second-day__temp', 'temp-day');
  const tempCelsiusSecondDay = Math.round(
    (weatherData.daily.data[1].temperatureHigh + weatherData.daily.data[1].temperatureLow) / 2
  );
  deg === 'C'
    ? (secondDayTemp.textContent = `${tempCelsiusSecondDay}°C`)
    : (secondDayTemp.textContent = `${celsiusToFahrenheitConverter(tempCelsiusSecondDay)}°F`);
  secondDay.append(secondDayTemp);

  const icon2 = document.createElement('canvas');
  icon2.classList.add('icon2');
  icon2.id = 'icon2';
  icon2.width = 100;
  icon2.height = 100;
  secondDay.append(icon2);

  const thirdDay = document.createElement('div');
  thirdDay.classList.add('third-day', 'day');
  weatherThreeDays.append(thirdDay);

  const thirdDayName = document.createElement('p');
  thirdDayName.classList.add('third-day__name', 'name-day');
  thirdDayName.textContent = translation[lang].week[getDay(timezone, 3)];
  thirdDay.append(thirdDayName);

  const thirdDayTemp = document.createElement('p');
  thirdDayTemp.classList.add('third-day__temp', 'temp-day');
  const tempCelsiusThirdDay = Math.round(
    (weatherData.daily.data[2].temperatureHigh + weatherData.daily.data[2].temperatureLow) / 2
  );
  deg === 'C'
    ? (thirdDayTemp.textContent = `${tempCelsiusThirdDay}°C`)
    : (thirdDayTemp.textContent = `${celsiusToFahrenheitConverter(tempCelsiusThirdDay)}°F`);
  thirdDay.append(thirdDayTemp);

  const icon3 = document.createElement('canvas');
  icon3.classList.add('icon3');
  icon3.id = 'icon3';
  icon3.width = 100;
  icon3.height = 100;
  thirdDay.append(icon3);

  fragment.append(userLocation);
  fragment.append(weatherElement);

  return fragment;
};
