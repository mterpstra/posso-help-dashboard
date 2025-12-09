export const Patch = (collection, _id, field, value, success, error) => {
  const token = localStorage.getItem('zapmanejo_token');
  let body = {_id};
  body[field] = value;
  const url = `/api/data/${collection}`;
  fetch(url, {
    method: 'PATCH',
    headers: {
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify(body),
  })
  .then(response => {
    if (response.status === 200) {
      success();
    }
    if (response.status === 401) {
      localStorage.removeItem('zapmanejo_token');
      localStorage.removeItem('zapmanejo_user');
      window.location.reload();
    }
  })
  .catch(error => {
    console.error('Error updating form data:', error);
    error();
  });
}
export default Patch;
