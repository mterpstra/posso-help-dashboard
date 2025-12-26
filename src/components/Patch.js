export const PatchV2 = (collection, body, success, error) => {
  const token = localStorage.getItem('zapmanejo_token');
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
      if (typeof success === "function") {
        success();
      }
    }
    if (response.status === 401) {
      localStorage.removeItem('zapmanejo_token');
      localStorage.removeItem('zapmanejo_user');
      window.location.reload();
    }
  })
  .catch(error => {
    console.error('Error updating form data:', error);
    if (typeof error === "function") {
      error();
    }
  });
}


export const Patch = (collection, _id, field, value, success, error) => {
  let body = {_id};
  body[field] = value;
  PatchV2(collection, body, success, error);
}

export default Patch;
