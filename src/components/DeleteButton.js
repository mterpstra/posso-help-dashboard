import './DeleteButton.css';

export const DeleteButton = (props) => {
  
  const deleteByID = (id) => {
    const token = localStorage.getItem('zapmanejo_token');
    const url = `/api/data/${props.collection}/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('zapmanejo_token');
          localStorage.removeItem('zapmanejo_user');
          window.location.reload();
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      props.onComplete();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  const handleDelete = (e) => {
    props.data.forEach(row => {
      deleteByID(row._id);
    });
  }

  if (props.data === null) return;
  if (props.data === undefined) return;
  if (!Array.isArray(props.data)) return;
  const count = props.data.length;
  if (count === 0) return;

  let text = `Delete ${count} item`;
  if (count > 1) {
    text += "s"
  }
  return (
    <button className="deleteButton" onClick={handleDelete}>{text}</button>
  );
}

export default DeleteButton;
