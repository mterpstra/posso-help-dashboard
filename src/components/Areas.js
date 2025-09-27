import DataCollection from './DataCollection';
export const Areas = (props) => {
  const title = 'Areas'
  const collection = 'areas'
  const columns = [
    {name: 'Area',      selector: row => row.name},
    {name: 'Nicknames', selector: row => row.matches},
  ];
  return (
    <DataCollection 
      title={title} 
      collection={collection} 
      columns={columns}/>
  );
}
export default Areas;
