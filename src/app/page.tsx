import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import dynamic from 'next/dynamic';

const SearchBar2 = dynamic(() => import('@/components/SearchBar2'), { ssr: false });

/** Renders a list of restaurants for the directory page. */
const ListPage = async () => {
  let restaurants = [];
  try {
    restaurants = await prisma.restaurant.findMany();
  } catch (error) {
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
