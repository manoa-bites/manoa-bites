import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Location } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditLocationForm from '@/components/EditLocationForm';
import { Container } from 'react-bootstrap';

export default async function EditLocation({
  params,
}: {
  params: { locationId: string | string[] };
}) {
  const session = await getServerSession(authOptions);

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const id = Number(params.locationId);

  const location: Location | null = await prisma.location.findUnique({
    where: { id },
  });

  if (!location) {
    return notFound();
  }

  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;

  if (role !== 'ADMIN') {
    return notFound();
  }

  return (
    <main>
      <Container>
        <EditLocationForm
          id={location.id}
          name={location.name}
        />
      </Container>
    </main>
  );
}
