import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminVendorProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Restaurant } from '@prisma/client';
import RestaurantItemAdmin from '@/components/RestaurantItemAdmin';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  // const { data: session } = useSession();
  const currentUserEmail = session?.user?.email as string;
  const currentUser = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  const currentUserId = currentUser?.id;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;

  adminVendorProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const users = await prisma.user.findMany({});

  const getRestaurants = async (): Promise<Restaurant[]> => {
    let ret: Restaurant[] = [];
    if (role === 'ADMIN') {
      ret = await prisma.restaurant.findMany({});
    }
    if (role === 'VENDOR' && currentUserId) {
      ret = await prisma.restaurant.findMany({
        where: {
          postedById: currentUserId,
        },
      });
    }
    return ret;
  };

  const restaurants: Restaurant[] = await getRestaurants();

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>List Stuff Admin</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Posted By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map(async (restaurant) => {
                  const locationRecord = await prisma.location.findUnique({
                    where: {
                      id: restaurant.locationId,
                    },
                  });

                  const location = locationRecord?.name || 'Unknown Location';

                  return (
                    <RestaurantItemAdmin
                      key={restaurant.id}
                      name={restaurant.name}
                      location={location}
                      id={restaurant.id}
                      postedby={currentUserEmail}
                    />
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        {currentUserEmail && role === 'ADMIN' ? (
          <div>
            <Row>
              <Col>
                <h1>List Users Admin</h1>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        ) : null}
      </Container>
    </main>
  );
};

export default AdminPage;
