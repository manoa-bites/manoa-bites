import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

export default function App() {
  return (
    <Container>
      <Row className="w-100">
        <Col lg={6} className="my-4">
          <iframe
            // eslint-disable-next-line max-len
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115681.29592731265!2d-77.47713270775661!3d25.0326996781907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x892f7c99b981dbc9%3A0x2aef01d3485e50d2!2sNassau%2C%20Bahamy!5e0!3m2!1spl!2spl!4v1624445118063!5m2!1spl!2spl"
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
