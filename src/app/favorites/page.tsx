import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Restaurant } from '@prisma/client';
// import { Restaurant } from '@prisma/client';

/** Render a list of stuff for the logged in user. */
const FavoritesPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
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
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            {/* <h1>Stuff</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Condition</th>
                  <th>Actions</th>
                </tr>
              </thead>
            </Table> */}
            {restaurants.map((restaurant) => (
              // CALL RESTAURANTCARD COMPONENT
              <div>{restaurant.name}</div>
            ))}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default FavoritesPage;
