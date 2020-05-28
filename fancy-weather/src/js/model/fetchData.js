async function fetchDataCity() {
  const apikey = '582fd7c58ed6e8';
  const url = `https://ipinfo.io/json?token=${apikey}`;

  const response = await fetch(url);

  const data = await response.json();
  return data;
}

async function fetchDataWeather(city) {
  const apikey = 'b87936fac4ac61be504920f6a93df6c0';
  const lang = 'en';

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=metric&APPID=${apikey}`;

  const response = await fetch(url);

  const data = await response.json();
  return data;
}

async function fetchDataGeocoding(city) {
  const apikey = 'cea0f85e1b3c41a8b266724bd3e9584e';
  const lang = 'en';

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apikey}&pretty=1&no_annotations=1`;

  const response = await fetch(url);

  const data = await response.json();
  return data;
}

// pk.eyJ1IjoiZW55YTE0MDciLCJhIjoiY2thcWdtb2xvMDA2ZzJ3bzVsMHlzZ2pxeCJ9.kA73NaNn18zEyyYvpy6hHg;

export { fetchDataCity, fetchDataWeather, fetchDataGeocoding };
