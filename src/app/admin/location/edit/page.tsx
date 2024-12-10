import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import EditLocationForm from '@/components/EditLocationForm';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { getServerSession } from 'next-auth';

// Define the expected type
type LocationType = {
  id: number;
  name: string;
};

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

  const location: LocationType | null = await prisma.location.findUnique({
    where: { id },
  });

  if (!location) {
    return notFound();
  }

  const currentUserEmail = session?.user?.email as string;
  const currentUser = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });

  const currentUserId = currentUser?.id;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;

  if (role !== 'ADMIN') {
    return notFound();
  }

  return (
    <main>
      {currentUserId ? (
        <EditLocationForm
          location={location}
        />
      ) : (
        <div>Not logged in</div>
      )}
    </main>
  );
}
