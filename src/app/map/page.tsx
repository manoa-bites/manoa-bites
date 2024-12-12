import App from '@/components/MapComponent';
import { Container } from 'react-bootstrap';

const MapPage = () => (
  <Container>
    <h1 className="text-center pt-4">Need Directions?</h1>
    <Container className="justify-content-center pb-4 d-flex">
      <App />
    </Container>
  </Container>
);

export default MapPage;
