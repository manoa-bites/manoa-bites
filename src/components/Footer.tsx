import { Button, Col, Container, Row } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer mt-auto py-3 text-white">
    <Container>
      <Row className="align-items-start justify-content-between">
        {/* Left Column - Manoa Bites */}
        <Col md={4}>
          <h3>MANOA BITES:</h3>
          <p>
            This application is designed to help students and staff at the University of Hawaii at Manoa
            easily find food options across campus locations.
          </p>
        </Col>

        {/* Right Column - Links */}
        <Col md={4} className="text-md-start">
          <h3>Links:</h3>
          <ul className="list-unstyled">
            <li><a href="foo" className="text-white">FAQ</a></li>
            <li><a href="/issueform" className="text-white">Report a Problem</a></li>
            <li>
              <a href="https://github.com/manoa-bites/manoa-bites" className="text-white">
                Link to our GitHub repo
              </a>
            </li>
          </ul>
        </Col>
      </Row>

      {/* Optional CTA Section */}
      <Container className="my-4">
        <hr className="mb-4" style={{ borderColor: 'white' }} />
        <Row className="justify-content-center align-items-center text-center">
          <Col xs="auto">
            <span className="me-3">Register for free</span>
          </Col>
          <Col xs="auto">
            <Button variant="dark" className="rounded-pill" href="\auth\signin">
              Sign up!
            </Button>
          </Col>
        </Row>
        <hr className="mt-4" style={{ borderColor: 'white' }} />
      </Container>
    </Container>
  </footer>
);

export default Footer;
