import DataCollection from './DataCollection.js';
export const Temperatures = (props) => {
  const title = 'Temperatures';
  const collection = 'temperature';
  const columns = [
    {name:"Temperature", selector: row => `${row.temperature} celcius`, sortable:true},
    {name:"Date", selector: row => row.date, sortable:true},
    {name:"Who", selector: row => row.name, sortable:true},
    {name:"From", selector: row => row.phone, sortable:true},
  ];
  return (
    <DataCollection 
      title={title} 
      collection={collection} 
      columns={columns}/>
  );
}
export default Temperatures;
