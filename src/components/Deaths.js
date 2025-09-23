import DataCollection from './DataCollection';
export const Deaths = (props) => {
  const title = 'Deaths'
  const collection = 'deaths'
  const columns = [
    {name:"Tag", selector: row => row.tag, sortable:true},
    {name:"Cause", selector: row => row.cause, sortable:true},
    {name:"Sex", selector: row => row.sex, sortable:true},
    {name:"Area", selector: row => row.area, sortable:true},
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
export default Deaths;
