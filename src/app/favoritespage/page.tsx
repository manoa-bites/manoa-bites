import { getServerSession } from 'next-auth';
import { Container } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

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
  // console.log(stuff);
  return (
    <main>
      <Container>
        <FavoritesPage />
      </Container>
    </main>
  );
};

export default FavoritesPage;
