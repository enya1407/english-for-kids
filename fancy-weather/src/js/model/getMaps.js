import ymaps from 'ymaps';

let currentPlacemark;
let maps;
let map;

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

export const getMap = async (coords, lang) => {
  maps = await getMaps(lang);

  const [latitude, longitude] = coords.split(',').map((el) => Number(el));

  const map = new maps.Map('map', { center: [latitude, longitude], zoom: 12 });

  currentPlacemark = new maps.Placemark(map.getCenter(), {});

  map.geoObjects.add(currentPlacemark);

  return map;
};

export const setPlacemark = (map) => {
  map.geoObjects.remove(currentPlacemark);
  setTimeout(() => {
    currentPlacemark = new maps.Placemark(map.getCenter(), {});
    map.geoObjects.add(currentPlacemark);
  }, 2000);
};
