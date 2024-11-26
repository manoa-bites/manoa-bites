import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import RestaurantCard from '@/components/RestaurantCard';
import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { Restaurant } from '@prisma/client';

/** Renders a list of restaurants for the directory page. */
const FavoritesPage = async () => {
  // Get the session of the logged-in user
  const session = await getServerSession(authOptions);

  const owner = (session && session.user && session.user.email) || '';
  const user = await prisma.user.findUnique({ where: { email: owner } });

  const getFavoritedRestaurants = async (): Promise<Restaurant[]> => {
    const favorites = await prisma.favoriteRestaurant.findMany({
      where: { userFavoritedId: user?.id },
    });
    const restaurantPromises: Promise<Restaurant | null>[] = [];

    favorites.forEach((favorite) => {
      restaurantPromises.push(
        prisma.restaurant.findUnique({
          where: { id: favorite.restaurantFavoritedId },
        }),
      );
    });

    const restaurants = (await Promise.all(restaurantPromises)).filter(
      Boolean,
    ) as Restaurant[];
    return restaurants;
  };

  const restaurants: Restaurant[] = await getFavoritedRestaurants();

  return (
    <main>
      <Container id="list" className="py-3">
        <h1 className="text-center">Your Favorite Restaurants</h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          {restaurants.map((restaurant) => (
            <Col key={restaurant.name}>
              <RestaurantCard restaurant={restaurant} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default FavoritesPage;
