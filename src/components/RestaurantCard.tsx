import { Restaurant } from '@prisma/client';
import { Card, ListGroup, Button } from 'react-bootstrap';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>
        {restaurant.name}
      </Card.Title>
      <Card.Subtitle>{restaurant.website}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Phone:
          {restaurant.phone}
        </ListGroup.Item>
        <ListGroup.Item>
          <a href="restaurant.menuLink" target="_blank" rel="noopener noreferrer">Menu</a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a href="restaurant.onlineOrderLink" target="_blank" rel="noopener noreferrer">Order Online</a>
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
    <Card.Footer>
      <Button variant="secondary">
        <i className="bi bi-suit-heart" />
      </Button>
    </Card.Footer>
  </Card>
);

export default RestaurantCard;
