export const clearPage = () => {
  const weatherContainer = document.querySelector('.weather__container');

  while (weatherContainer.firstChild) {
    weatherContainer.removeChild(weatherContainer.firstChild);
  }
};
