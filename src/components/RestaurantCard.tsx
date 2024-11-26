'use client';

import { Restaurant } from '@/lib/validationSchemas';
import { Card, ListGroup, Button } from 'react-bootstrap/';
import { Heart } from 'react-bootstrap-icons';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { addFavorite } from '@/lib/dbActions';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const { data: session } = useSession();

  return (
    <main>
      <Card className="h-100 mb-3">
        <Card.Header>
          <Card.Title>{restaurant.name}</Card.Title>
          <Card.Subtitle>
            <Link
              href={restaurant.website || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {restaurant.website}
            </Link>
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Phone:
              {restaurant.phone || 'Not Available'}
            </ListGroup.Item>
            <ListGroup.Item>
              <Link
                href={restaurant.menuLink || 'Menu Not Available'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Menu
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link
                href={restaurant.onlineOrderLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order Online
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="secondary"
            onClick={async () => {
              if (!session) {
                swal(
                  'Error',
                  'You must be logged in to add favorites.',
                  'error',
                  {
                    timer: 10000,
                  },
                );
                return;
              }

              if (session?.user?.email) {
                const newFavorite = {
                  userFavoriteEmail: session?.user?.email as string,
                  restaurantFavoritedId: restaurant.id,
                };
                await addFavorite(newFavorite);
              }
            }}
          >
            <Heart />
          </Button>
        </Card.Footer>
      </Card>
    </main>
  );
};

export default RestaurantCard;
