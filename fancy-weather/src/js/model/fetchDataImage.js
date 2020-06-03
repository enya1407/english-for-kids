export async function fetchDataImage(query, lang) {
  console.log('query for image API: ', query);
  const apiKey = 'q73ay1HJ6ibZueRSMVZz1t2Pt4ns194G9s-ITb6Qw30';
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${query}&client_id=${apiKey}`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    return data.urls.full;
  } catch (err) {
    errorOutput(lang, err);
  }
}
