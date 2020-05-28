import { fetchDataCity, fetchDataWeather, fetchDataGeocoding } from '../model/fetchData';

export const renderPages = async (city) => {
  const fragment = new DocumentFragment();

  console.log(city);
  const Weather = await fetchDataWeather(city);
  console.log(Weather);
  const time = new Date();
  console.log(
    time.getDay(),
    time.getMonth(),
    time.getDate(),
    time.getFullYear(),
    time.getHours(),
    time.getMinutes(),
    time.toDateString()
  );

  // dayOfTheWeek = time.getDay()

  const userLocation = document.createElement('div');
  userLocation.classList.add('user-location');

  const userLocationPlace = document.createElement('div');
  userLocationPlace.classList.add('user-location__place');
  userLocationPlace.textContent = `${city},`;
  userLocation.append(userLocationPlace);

  const userLocationDate = document.createElement('div');
  userLocationDate.classList.add('user-location__date');
  userLocationDate.textContent = `${time.toDateString()} ${time.toLocaleTimeString()}`;
  userLocation.append(userLocationDate);

  const weather = document.createElement('div');
  weather.classList.add('weather');

  const weatherToday = document.createElement('div');
  weatherToday.classList.add('weather__today');
  weather.append(weatherToday);

  const temp = document.createElement('div');
  temp.classList.add('temp');
  temp.textContent = `${Math.round(Weather.list[0].main.temp)}°`;
  weatherToday.append(temp);

  const otherInformation = document.createElement('div');
  otherInformation.classList.add('other-information');
  weatherToday.append(otherInformation);

  const weatherDescription = document.createElement('p');
  weatherDescription.classList.add('weather-description');
  weatherDescription.textContent = `${Weather.list[0].weather[0].description}`;
  otherInformation.append(weatherDescription);

  const weatherFeels = document.createElement('p');
  weatherFeels.classList.add('weather-feels');
  weatherFeels.textContent = `feels like:`;
  otherInformation.append(weatherFeels);

  const wind = document.createElement('p');
  wind.classList.add('wind');
  wind.textContent = `wind: ${Math.round(Weather.list[0].wind.speed)}mph`;
  otherInformation.append(wind);

  const humidity = document.createElement('p');
  humidity.classList.add('humidity');
  humidity.textContent = `humidity: ${Weather.list[0].main.humidity}%`;
  otherInformation.append(humidity);

  const weatherThreeDays = document.createElement('div');
  weatherThreeDays.classList.add('weather__three-days');
  weather.append(weatherThreeDays);

  fragment.append(userLocation);
  fragment.append(weather);

  return fragment;
};
