import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';

const NotFound = () => (
  <Container className="p-3 page" fluid="sm">
  <Row>
    <Col className="text-center">
    <h1>404 - Not Found!</h1>
    <Link to="/">
      Go back to home
    </Link>
  </Col>
  </Row>
  </Container>
);

export default NotFound;