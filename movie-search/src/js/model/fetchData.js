async function fetchData(query) {
  const apikey = 'ca876ee4';
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apikey}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchDataId(id) {
  const apikey = 'ca876ee4';
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${apikey}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function translateWord(word) {
  const key =
    'trnsl.1.1.20200506T105922Z.e45adfa6da9464aa.a3b3af3df094bb82b401c91a520b47a69b8c2318';
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${word}&lang=ru-en`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export { fetchData, fetchDataId, translateWord };
