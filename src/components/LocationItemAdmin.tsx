type LocationItemProp = {
  id: number;
  name: string;
};

const LocationItemAdmin = ({
  id,
  name,
}: LocationItemProp) => (
  <tr>
    <td>{id}</td>
    <td>{name}</td>
    <td>
      <a href={`/admin/location/edit/${id}`}>Edit</a>
      {' '}
      <a href={`/admin/location/delete/${id}`}>Delete</a>
    </td>
  </tr>
);

export default LocationItemAdmin;
