import { Col, Container, Row, Image } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col xs={4} />
        <Col xs={4}>
          <Row>
            <h1 className="rainbow-text">UHM-Manoa-Bites!</h1>
          </Row>
          <h2>Find your favorite food spots on campus!</h2>
        </Col>
      </Row>
      <Row className="align-middle text-center row p-4">
        <Col xs={4}>
          <Image src="/aloha-funny.jpg" alt="aloha" width="120px" />
          <h1 className="p-2">Already A Munch?</h1>
          <h2>Login in Here!</h2>
        </Col>
        <Col xs={4}>
          <Image src="/eat.png" alt="play" width="160px" />
          <h1 className="p-2">Looking for UHM-Manoa-bites?</h1>
          <h2>Sign Up Now Here!</h2>
        </Col>
        <Col xs={4}>
          <Image src="/cashier.jpg" alt="vendor" width="150px" />
          <h1 className="p-2">Do You Want To Sell?</h1>
          <h2>Become A Vendor Here!</h2>
        </Col>
      </Row>
    </Container>
    );
  </main>
);

export default Home;
