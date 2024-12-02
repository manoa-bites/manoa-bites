type RestaurantItemProp = {
  name: string;
  location: string;
  postedby: string;
  id: number;
};

const RestaurantItemAdmin = ({
  name,
  location,
  postedby,
  id,
}: RestaurantItemProp) => (
  <tr>
    <td>{id}</td>
    <td>{name}</td>
    <td>{location}</td>
    <td>{postedby}</td>
    <td>
      <a href={`/admin/restaurant/edit/${id}`}>Edit</a>
      {' '}
      <a href={`/admin/restaurant/delete/${id}`}>Delete</a>
    </td>
  </tr>
);

export default RestaurantItemAdmin;
