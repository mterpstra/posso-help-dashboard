export const Get = (dataPath, success, error) => {
  const token = localStorage.getItem('zapmanejo_token');
  const url = `/api/data/${dataPath}`;
  fetch(url, {
    method: 'GET',
    headers: {
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    success(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    if (typeof error === 'function') {
      error();
    }
  });
}
