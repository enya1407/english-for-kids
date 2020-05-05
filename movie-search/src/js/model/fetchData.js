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

export { fetchData, fetchDataId };
