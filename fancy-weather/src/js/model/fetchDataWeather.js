import { errorOutput } from '../helper';

export async function fetchDataWeather(loc, lang) {
  const apiKey = 'f11901ee631628df00a73fd6b08cef3e';
  const { lat, lng } = loc;

  const proxyUrl = 'https://evening-basin-27448.herokuapp.com/';
  const url = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}?units=si&lang=en`;
  try {
    const forecast = await fetch(proxyUrl + url).then((res) => res.json());

    return forecast;
  } catch (err) {
    console.log(err);
    return errorOutput(lang, err);
  }
}
