import { Restaurant } from '@/lib/validationSchemas';
import { Card, ListGroup, Button } from 'react-bootstrap/';
import { Heart } from 'react-bootstrap-icons';
import Link from 'next/link';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
  <Card className="h-100 mb-3">
    <Card.Header>
      <Card.Title>
        {restaurant.name}
      </Card.Title>
      <Card.Subtitle>
        <Link href={restaurant.website} target="_blank" rel="noopener noreferrer">
          {restaurant.website}
        </Link>
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Phone:
          {restaurant.phone}
        </ListGroup.Item>
        <ListGroup.Item>
          <Link href={restaurant.menuLink} target="_blank" rel="noopener noreferrer">Menu</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link href={restaurant.onlineOrderLink} target="_blank" rel="noopener noreferrer">Order Online</Link>
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
