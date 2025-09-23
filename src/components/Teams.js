import DataCollection from './DataCollection';
export const Teams = (props) => {
  const title = "Teams";
  const collection = "teams";
  const columns = [
    { name: 'Name',         selector: row => row.name},
    { name: 'Phone Number', selector: row => row.phone_number},
  ];
  return (
    <DataCollection 
      title={title} 
      collection={collection} 
      columns={columns}/>
  );
}
export default Teams;
