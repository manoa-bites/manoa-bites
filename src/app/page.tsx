import { PrismaClient, Restaurant } from '@prisma/client'; // Import Prisma types
import { Col, Container, Row } from 'react-bootstrap';
import dynamic from 'next/dynamic';

const prisma = new PrismaClient();
const SearchBar2 = dynamic(() => import('@/components/SearchBar2'), { ssr: false });

/** Renders a list of restaurants for the directory page. */
const ListPage = async () => {
  let restaurants: Restaurant[] = []; // Explicitly define the type as Restaurant[]

  try {
    // Fetching restaurant data from the database
    restaurants = await prisma.restaurant.findMany();
  } catch (error) {
    // Logging any errors that occur during fetching
    console.error("Failed to fetch restaurants:", error);
  }

  return (
    <main>
      <Container id="list" className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">Restaurants at Manoa</h1>
          </Col>
        </Row>
        
        {/* Conditional rendering based on whether restaurants were found */}
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
