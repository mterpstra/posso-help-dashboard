import DataCollection from './DataCollection';
export const Births = (props) => {
  const title = 'Births';
  const collection = 'births';
  const columns = [
    {name: 'Tag',  selector: row => row.tag, sortable: true},
    {name: 'Breed',selector: row => row.breed, sortable: true},
    {name: 'Sex',  selector: row => row.sex,sortable: true},
    {name: 'Pure', selector: (row) => (row.pure_breed) ? "true" : "false", sortable: true},
    {name: 'Area', selector: row => row.area, sortable: true},
    {name: 'Date', selector: row => row.date, sortable: true},
    {name: 'Who',  selector: row => row.name, sortable: true},
    {name: 'From', selector: row => row.phone, sortable: true},
  ];
  return (
    <DataCollection 
      title={title} 
      collection={collection} 
      columns={columns}/>
  );
}
export default Births;
