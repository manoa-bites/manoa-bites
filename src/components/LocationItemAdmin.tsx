type LocationItemProps = {
  id: number;
  name: string;
};

const LocationItemAdmin = ({ name, id }: LocationItemProps) => (
  <tr>
    <td>{name}</td>
    <td>
      <a href={`/admin/location/edit/${id}`}>Edit</a>
    </td>
  </tr>
);

export default LocationItemAdmin;
