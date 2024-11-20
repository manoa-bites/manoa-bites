import { Container, Image } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className=" justify-content-center py-3">
      <Container className="d-flex justify-content-center align-items-center">
        <Image src="/FullLogo.png" alt="Manoa Bites" style={{ height: '500px', borderRadius: '50%' }} />
      </Container>
      <Container className="d-flex justify-content-center align-items-center">
        <h2>Find your favorite food spots on campus!</h2>
      </Container>
    </Container>
  </main>
);

export default Home;
