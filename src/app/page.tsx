import { PrismaClient, Restaurant } from '@prisma/client'; // Import Prisma types
import { Col, Container, Row } from 'react-bootstrap';
import dynamic from 'next/dynamic';

const prisma = new PrismaClient();
const SearchBar2 = dynamic(() => import('@/components/SearchBar2'), {
  ssr: false,
});

type RestaurantWithLocationName = Restaurant & {
  locationName: string | null;
};

/** Renders a list of restaurants for the directory page. */
const ListPage = async () => {
  const fetchedRestaurants = await prisma.restaurant.findMany();

  const restaurants: RestaurantWithLocationName[] = await Promise.all(
    fetchedRestaurants.map(async (res) => {
      let name = null;

      if (res.locationId) {
        const location = await prisma.location.findUnique({
          where: { id: res.locationId },
        });
        name = location?.name;
      }

      return {
        ...res,
        locationName: name || null,
      };
    }),
  );

  return (
    <main>
      <Container id="list" className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">Restaurants at Manoa</h1>
          </Col>
        </Row>
        {restaurants.length > 0 ? (
          <Row>
            <SearchBar2 initialRestaurants={restaurants} />
          </Row>
        ) : (
          <Row>
            <Col>
              <p className="text-center">No restaurants found.</p>
            </Col>
          </Row>
        )}
      </Container>
    </main>
  );
};

export default ListPage;
