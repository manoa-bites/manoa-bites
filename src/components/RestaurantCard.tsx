import { Restaurant } from '@prisma/client';
import { Card, ListGroup, Button } from 'react-bootstrap/';
import { Heart } from 'react-bootstrap-icons';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
  <Card className="h-100 mb-3">
    <Card.Header>
      <Card.Title>
        {restaurant.name}
      </Card.Title>
      <Card.Subtitle>
        <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
          {restaurant.website}
        </a>
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Phone:
          {restaurant.phone}
        </ListGroup.Item>
        <ListGroup.Item>
          <a href={restaurant.menuLink} target="_blank" rel="noopener noreferrer">Menu</a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a href={restaurant.onlineOrderLink} target="_blank" rel="noopener noreferrer">Order Online</a>
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
    <Card.Footer>
      <Button variant="secondary">
        <Heart />
      </Button>
    </Card.Footer>
  </Card>
);

export default RestaurantCard;
