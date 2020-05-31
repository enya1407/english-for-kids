import ymaps from 'ymaps';

async function fetchDataCity() {
  const apikey = '582fd7c58ed6e8';
  const url = `https://ipinfo.io/json?token=${apikey}`;

  const response = await fetch(url);

  const data = await response.json();

  return data;
}

async function fetchDataWeather(city, lang) {
  const apikey = 'b87936fac4ac61be504920f6a93df6c0';
  // const lang = 'en';

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=metric&APPID=${apikey}`;

  const response = await fetch(url);

  const data = await response.json();
  console.log(data, lang, 'fetchDataWeather');
  return data;
}

async function fetchDataGeocoding(val, lang) {
  const apikey = 'cea0f85e1b3c41a8b266724bd3e9584e';

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${val}&key=${apikey}&pretty=1&no_annotations=1&language=${lang}`;

  const response = await fetch(url);

  const data = await response.json();
  console.log(data, 'fetchDataGeocoding');
  return data;
}

const getMaps = async (lang) => {
  let langFormatted;

  switch (lang) {
    case 'en':
      langFormatted = 'en_US';
      break;
    case 'ru':
      langFormatted = 'ru_RU';
      break;
    case 'be':
      langFormatted = 'en_US';
      break;
    default:
      break;
  }

  const API_KEY = '3b84c181-81c6-43d5-81ca-6531f3f83e81';
  const url = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=${langFormatted}`;

  try {
    const maps = await ymaps.load(url);

    return maps;
  } catch (err) {
    err.name = 'getMaps API Error';
    err.message = 'just yandex';
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
};

const getMap = async (coords, lang) => {
  const maps = await getMaps(lang);

  const [latitude, longitude] = coords.split(',').map((el) => Number(el));

  const map = new maps.Map('map', {
    center: [latitude, longitude],
    zoom: 12,
  });

  return map;
};

// pk.eyJ1IjoiZW55YTE0MDciLCJhIjoiY2thcWdtb2xvMDA2ZzJ3bzVsMHlzZ2pxeCJ9.kA73NaNn18zEyyYvpy6hHg;

export { fetchDataCity, fetchDataWeather, fetchDataGeocoding, getMap };
