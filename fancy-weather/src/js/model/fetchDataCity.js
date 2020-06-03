import { errorOutput } from '../helper';

export async function fetchDataCity(lang) {
  const apiKey = '582fd7c58ed6e8';
  const url = `https://ipinfo.io/json?token=${apiKey}`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return errorOutput(lang, err);
  }
}
