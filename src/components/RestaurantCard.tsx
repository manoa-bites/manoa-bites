import { Card, ListGroup, Button } from 'react-bootstrap/';
import { Heart } from 'react-bootstrap-icons';
import Link from 'next/link';

interface RestaurantCardProps {
  restaurant: {
    id: number;
    name: string;
    website: string | null;
    phone: string | null;
    menuLink: string | null;
    onlineOrderLink: string | null;
  };
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => (
  <Card className="h-100 mb-3">
    <Card.Header>
      <Card.Title>{restaurant.name}</Card.Title>
      <Card.Subtitle>
        {restaurant.website ? (
          <Link href={restaurant.website} target="_blank" rel="noopener noreferrer">
            {restaurant.website}
          </Link>
        ) : (
          'Website not available'
        )}
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Phone:</strong>
          {' '}
          {restaurant.phone}
        </ListGroup.Item>
        <ListGroup.Item>
          {restaurant.menuLink ? (
            <Link href={restaurant.menuLink} target="_blank" rel="noopener noreferrer">
              Menu
            </Link>
          ) : (
            'Menu not available'
          )}
        </ListGroup.Item>
        <ListGroup.Item>
          {restaurant.onlineOrderLink ? (
            <Link href={restaurant.onlineOrderLink} target="_blank" rel="noopener noreferrer">
              Order Online
            </Link>
          ) : (
            'Online ordering not available'
          )}
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
    <Card.Footer>
      <Button variant="link">
        <Heart />
      </Button>
    </Card.Footer>
  </Card>
);

export default RestaurantCard;
