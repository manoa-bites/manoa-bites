import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import RestaurantCard from '@/components/RestaurantCard';
import SearchBar from '@/components/SearchBar';
import SearchBar2 from '@/components/SearchBar2';

/** Renders a list of restuarants for the directory page. */
const ListPage = async () => {
  const restaurants = await prisma.restaurant.findMany();
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Restaurants at Manoa</h1>
              <Col md={8} className="mx-auto">
                <SearchBar initialResults={[]} />
              </Col>
              <Row>
                <SearchBar2 />
              </Row>
              <Row xs={1} md={2} lg={3} className="g-4">
                {restaurants.map((restaurant) => (
                  <Col key={restaurant.name}>
                    <RestaurantCard restaurant={restaurant} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default ListPage;
