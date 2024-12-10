import { getServerSession } from 'next-auth';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminVendorProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Restaurant, Location } from '@prisma/client';
import RestaurantItemAdmin from '@/components/RestaurantItemAdmin';
import LocationItemAdmin from '@/components/LocationItemAdmin';
import { PlusCircleFill } from 'react-bootstrap-icons';
import IssueCard from '@/components/IssueCard';

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

  const getLocations = async (): Promise<Location[]> => {
    const ret = await prisma.location.findMany({});
    return ret;
  };

  const restaurants: Restaurant[] = await getRestaurants();
  const locations: Location[] = await getLocations();
  const issues = await prisma.issue.findMany();
  return (
    <main>
      <Container id="list" className="py-3">
        <Row>
          <Col>
            <h1>{`List Restaurants ${role}`}</h1>
            <Button
              variant="success"
              className="mb-3"
              href="/admin/restaurant/add"
            >
              Add Restaurant
              {' '}
              <PlusCircleFill />
            </Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>

                  <th>Name</th>
                  <th>Location</th>
                  <th>Posted By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map(async (restaurant) => {
                  let location = 'Unknown Location';
                  if (restaurant.locationId) {
                    const locationRecord = await prisma.location.findUnique({
                      where: {
                        id: restaurant.locationId,
                      },
                    });
                    if (locationRecord?.name) {
                      location = locationRecord?.name;
                    }
                  }

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

        {role === 'ADMIN' ? (
          <main>
            <Row>
              <Col>
                <h1>{`List Restaurants ${role}`}</h1>
                <Button
                  variant="success"
                  className="mb-3"
                  href="/admin/location/add"
                >
                  Add Location
                  {' '}
                  <PlusCircleFill />
                </Button>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map(async (location) => (
                      <LocationItemAdmin key={location.id} id={location.id} name={location.name} />
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </main>
        ) : null}
        {currentUserEmail && role === 'ADMIN' ? (
          <div>
            <Row>
              <Col>
                <h1>
                  List Users
                  {role}
                </h1>
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
            <Row>
              <Col>
                <h1 className="text-center">Reported Problems</h1>
                <Row xs={1} md={2} lg={3} className="g-4">
                  {issues.map((issue) => (
                    <Col key={issue.topic}>
                      <IssueCard issue={issue} />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </div>
        ) : null}
      </Container>
    </main>
  );
};

export default AdminPage;
