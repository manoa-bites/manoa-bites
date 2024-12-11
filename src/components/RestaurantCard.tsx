'use client';

import { Restaurant } from '@/lib/validationSchemas';
import { Card, ListGroup, Button, Image } from 'react-bootstrap/';
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

type RestaurantWithLocationName = Restaurant & {
  locationName:string | null
};

const RestaurantCard = ({ restaurant }: { restaurant: RestaurantWithLocationName }) => {
  const { data: session } = useSession();
  const currentUserEmail = session?.user?.email as string;

  const [isImageAvailable, setIsImageAvailable] = useState(false);

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

  useEffect(() => {
    const checkImage = async () => {
      try {
        const response = await fetch(`/api/restaurant/image/${restaurant.id}`);
        if (response.status === 200) {
          setIsImageAvailable(true);
        } else {
          setIsImageAvailable(false);
        }
      } catch (error) {
        console.error('Error checking image availability:', error);
        setIsImageAvailable(false);
      }
    };

    checkImage();
  }, [restaurant.id]);

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
          <Link href={`/restaurant/${restaurant.id}`} className="link-dark">
            <Card.Title>{restaurant.name}</Card.Title>
          </Link>
          <Card.Subtitle className="text-truncate" style={{ maxWidth: '16rem' }}>
            <Link
              href={restaurant.website || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-truncate"
              style={{ display: 'inline-block', maxWidth: '100%' }}
            >
              {restaurant.website || 'Website Not Available'}
            </Link>
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {isImageAvailable ? (
              <main>
                <Image
                  src={`/api/restaurant/image/${restaurant.id}`}
                  alt={`${restaurant.name} image`}
                  height="200px"
                  width="100%"
                  className="mb-2"
                />
              </main>
            ) : null}
            <ListGroup.Item>
              <strong>Located At:</strong>
              {' '}
              {restaurant.locationName || 'Not Available'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Phone:</strong>
              {' '}
              {restaurant.phone || 'Not Available'}
            </ListGroup.Item>
            <ListGroup.Item className="truncate-hours">
              <strong>Hours: </strong>
              {' '}
              {restaurant.hours || 'Not Available'}
            </ListGroup.Item>
            <ListGroup.Item className="truncate-description" style={{ height: '12rem' }}>
              <strong>Description:</strong>
              {' '}
              {restaurant.description || 'Not Available'}
            </ListGroup.Item>
            <ListGroup.Item>
              <Link
                href={restaurant.menuLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-truncate"
                style={{ display: 'inline-block', maxWidth: '100%' }}
              >
                Menu
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link
                href={restaurant.onlineOrderLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-truncate"
                style={{ display: 'inline-block', maxWidth: '100%' }}
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
