import { translation } from '../translation';

export const initTime = (timezone, lang) => {
  const timeAndDate = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: timezone,
    })
  );
  const dayWeekShort = translation[lang].short[timeAndDate.getDay()];
  const day = timeAndDate.getDate();
  const month = translation[lang].month[timeAndDate.getMonth()];
  const year = timeAndDate.getFullYear();
  let hour = timeAndDate.getHours();
  hour = hour < 10 ? `0${hour}` : hour;
  let minute = timeAndDate.getMinutes();
  minute = minute < 10 ? `0${minute}` : minute;
  let second = timeAndDate.getSeconds();
  second = second < 10 ? `0${second}` : second;

  return `${dayWeekShort} ${day} ${month} ${year} ${hour}:${minute}:${second}`;
};
