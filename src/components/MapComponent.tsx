import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

export default function App() {
  return (
    <Container>
      <Row className="w-100">
        <Col lg={6} className="my-4">
          <iframe
            // eslint-disable-next-line max-len
            src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=console.debug&libraries=maps,marker&v=beta"
            className="w-100"
            height="400"
            loading="lazy"
            title="Google Map"
          />
        </Col>
        <Col lg={6} className="my-4 d-flex align-items-center">
          <div>
            <h6>This map is embedded in a 6 column layout</h6>
            <p>
              Try to resize your browser window - you will see that it starts to take up 12 columns on
              screens smaller than 992px.
            </p>
            <p>
              This useful feature helps to make your embedded map responsive (
              <strong>mobile friendly</strong>
              ).
              You can customize responsive behavior with the use of
              {' '}
              <a
                href="https://mdbootstrap.com/docs/react/layout/breakpoints/"
                target="_blank"
                rel="noopener noreferrer"
              >
                breakpoints
              </a>
              .
            </p>
            <p>
              This text looks so nice because it&apos;s
              {' '}
              <strong>vertically centered</strong>
              {' '}
              you can achieve this
              effect using the
              {' '}
              <a
                href="https://mdbootstrap.com/docs/react/layout/vertical-alignment/"
                target="_blank"
                rel="noopener noreferrer"
              >
                vertical alignment
              </a>
              {' '}
              layout option.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
