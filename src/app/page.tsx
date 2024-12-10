import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import SearchBar2 from '@/components/SearchBar2';
import SearchBar from '@/components/SearchBar';

/** Renders a list of restuarants for the directory page. */
const ListPage = async () => {
  const restaurants = await prisma.restaurant.findMany();
  return (
    <main>
      <Container id="list" className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">Restaurants at Manoa</h1>
          </Col>
        </Row>
        <Row>
          <SearchBar2 initialRestaurants={restaurants} />
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
