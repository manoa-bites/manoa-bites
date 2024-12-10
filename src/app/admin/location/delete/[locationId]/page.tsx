import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Location } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import DeleteLocationForm from '@/components/DeleteLocationForm';
import { Container } from 'react-bootstrap';

export default async function DeleteLocation({
  params,
}: {
  params: { locationId: string | string[] };
}) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Safely parse the ID
  const id = Number(params.locationId);

  // Fetch the location safely
  const location: Location | null = await prisma.location.findUnique({
    where: { id },
  });

  // Handle not found case
  if (!location) {
    return notFound();
  }

  // Explicitly type-cast the Location fields to ensure they are always valid
  const { id: locationId, name: locationName } = location;

  return (
    <main>
      <Container>
        <DeleteLocationForm
          id={locationId} // Ensuring this is valid
          name={locationName || ''}
        />
      </Container>
    </main>
  );
}
