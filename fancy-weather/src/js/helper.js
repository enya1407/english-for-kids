export const celsiusToFahrenheitConverter = (tempCelsius) => tempCelsius * 1.8 + 32;

export const setTime = () => {
  const timeElement = document.querySelector('.user-location__time');

  return setInterval(() => {
    timeElement.textContent = new Date().toLocaleTimeString();
  }, 1000);
  // const timezone = timeAndDate.getTimezoneOffset() / 60;
};
