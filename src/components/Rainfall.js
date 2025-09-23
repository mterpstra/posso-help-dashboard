import DataCollection from './DataCollection';
export const Rainfall = (props) => {
  const title = "Rainfall";
  const collection = "rain";
  const columns = [
    {name:"Amount", selector: row => `${row.amount}mm`, sortable:true},
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
export default Rainfall;
