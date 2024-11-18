import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="justify-content-end">
        <h3>Resource Links:</h3>
        <p>FAQ</p>
        <p>About Us</p>
        <p><a href="/issueform">Report a problem</a></p>
        <p><a href="https://github.com/manoa-bites">Link to our source code</a></p>
      </Col>
    </Container>
  </footer>
);

export default Footer;
