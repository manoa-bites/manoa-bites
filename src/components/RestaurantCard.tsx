'use client';

import { Restaurant } from '@/lib/validationSchemas';
import { Card, ListGroup, Button } from 'react-bootstrap/';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  addFavorite,
  isRestaurantFavorited,
  removeFavorite,
} from '@/lib/dbActions';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const { data: session } = useSession();
  const currentUserEmail = session?.user?.email as string;

  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      const fetchFavoritedStatus = async () => {
        try {
          setLoading(true);
          const favorited = await isRestaurantFavorited(
            currentUserEmail,
            restaurant.id,
          );
          setIsFavorited(favorited);
        } finally {
          setLoading(false);
        }
      };

      fetchFavoritedStatus();
    } else {
      setLoading(false);
    }
  }, [currentUserEmail, restaurant.id, session]);

  const handleAddFavorite = async () => {
    if (!session) {
      swal('Error', 'You must be logged in to add favorites.', 'error', {
        timer: 10000,
      });
      return;
    }

    if (currentUserEmail) {
      const newFavorite = {
        userFavoriteEmail: currentUserEmail,
        restaurantFavoritedId: restaurant.id,
      };
      await addFavorite(newFavorite);
      setIsFavorited(true);
    }
  };

  const handleRemoveFavorite = async () => {
    if (!session) {
      swal('Error', 'You must be logged in to remove favorites.', 'error', {
        timer: 10000,
      });
      return;
    }

    if (currentUserEmail) {
      const favoriteToRemove = {
        userFavoriteEmail: currentUserEmail,
        restaurantFavoritedId: restaurant.id,
      };
      await removeFavorite(favoriteToRemove);
      setIsFavorited(false);
    }
  };

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
          {loading && <LoadingSpinner />}
          {!loading && isFavorited && (
            <Button variant="secondary" onClick={handleRemoveFavorite}>
              <HeartFill />
            </Button>
          )}
          {!loading && !isFavorited && (
            <Button variant="secondary" onClick={handleAddFavorite}>
              <Heart />
            </Button>
          )}
        </Card.Footer>
      </Card>
    </main>
  );
};

export default RestaurantCard;
