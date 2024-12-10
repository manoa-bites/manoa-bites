import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Location } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditLocationForm from '@/components/EditLocationForm';

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

  const currentUserEmail = session?.user?.email as string;
  const currentUser = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });

  const currentUserId = currentUser?.id;

  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;

  if (!location) {
    return notFound();
  }

  if (role !== 'ADMIN' && location?.id !== currentUserId) {
    return notFound();
  }

  return (
    <main>
      {currentUserId ? (
        <EditLocationForm
          location={{ id: location.id, name: location.name }}
        />
      ) : (
        <div>Not logged in</div>
      )}
    </main>
  );
}
