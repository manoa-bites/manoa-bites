import IndividualMapComponent from '@/components/IndividualMapComponent';
import { prisma } from '@/lib/prisma';
import { Container, Image, Col, Row } from 'react-bootstrap';

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
      where: { id: restaurant.locationId }, // Corrected to use locationId
    });
    locationName = location?.name; // Retrieve the name if the location exists
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
    <Container className="py-3">
      <Row>
        <Col>
          <Image
            className="py-3 mx-auto d-block"
            src={`/api/restaurant/image/${restaurant.id}`}
            alt={`${restaurant.name} image`}
            height="500px"
          />
        </Col>
        <Col className="py-3 align-items-center">
          <h3>Location</h3>
          <IndividualMapComponent restaurant={restaurant} />
        </Col>
      </Row>
      <Row>
        <h3>{restaurant?.name}</h3>
      </Row>
      <Row>
        <Col>
          <h5>
            Located at:
            {' '}
            {locationName}
          </h5>
          <h5 className="truncate-one-line">
            Website:
            {' '}
            <a href={restaurant.website || '#'} target="_blank" rel="noopener noreferrer">
              {restaurant?.website || 'Website Not Available'}
            </a>
          </h5>
          <h5>
            Phone:
            {' '}
            {restaurant?.phone || 'Phone Not Available'}
          </h5>
          <h5>
            Hours:
            {' '}
            {restaurant?.hours || 'Hours Not Available'}
          </h5>
          <a href={restaurant.menuLink || 'Menu Not Available'} target="_blank" rel="noopener noreferrer">
            <h5>Menu</h5>
          </a>
          <a href={restaurant.onlineOrderLink || '#'} target="_blank" rel="noopener noreferrer">
            <h5>Order Online</h5>
          </a>
        </Col>
        <Col>
          <h5>
            Description:
            {' '}
            {restaurant.description || 'Description Not Available'}
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantPage;
