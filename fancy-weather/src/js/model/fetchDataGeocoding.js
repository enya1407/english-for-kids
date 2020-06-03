import { errorOutput } from '../helper';
const wrapperSpinner = document.querySelector('.wrapper__spinner');

export async function fetchDataGeocoding(val, lang) {
  const apiKey = 'cea0f85e1b3c41a8b266724bd3e9584e';

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${val}&key=${apiKey}&pretty=1&no_annotations=1&language=${lang}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status !== 200) {
      console.log(data, 'response.status !== 200');
      throw new Error(data.status.message);
    }

    return data;
  } catch (err) {
    errorOutput(lang, err);
  }
}
