import { prisma } from '@/lib/prisma';
import { Container } from 'react-bootstrap';

interface RestaurantPageProps {
  params: { restaurantId: string };
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  // Fetch restaurant using restaurauntId param
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: Number(params.restaurantId),
    },
  });

  // Init location name as null
  let locationName = null;

  // Try and fetch location name and set to locationName
  if (restaurant?.locationId) {
    const location = await prisma.location.findUnique({
      where: { id: restaurant.id },
    });
    locationName = location?.name;
  }

  // If no restaurant, return 404 page
  if (!restaurant) {
    return (
      <Container className="justify-content-center p-4 d-flex">
        <h2>404, Restaurant not found!</h2>
      </Container>
    );
  }

  // Return restaurant page if restaurant found
  // Implement restaurant page design here.
  return (
    <Container className="justify-content-center p-4 d-flex">
      {restaurant?.name}
      {restaurant?.locationId}
      {locationName}
    </Container>
  );
};

export default RestaurantPage;
