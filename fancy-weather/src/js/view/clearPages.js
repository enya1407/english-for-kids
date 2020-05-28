export const clearPages = () => {
  const weatherContainer = document.querySelector('.weather__container');

  while (weatherContainer.firstChild) {
    weatherContainer.removeChild(weatherContainer.firstChild);
  }
};
