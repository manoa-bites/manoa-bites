import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Restaurant } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import DeleteRestaurantForm from '@/components/DeleteRestauantForm';

export default async function DeleteRestaurant({
  params,
}: {
  params: { restaurantId: string | string[] };
}) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const id = Number(params.restaurantId);
  console.log(id);
  const restaurant: Restaurant | null = await prisma.restaurant.findUnique({
    where: { id },
  });

  const locations = await prisma.location.findMany({});

  const currentUserEmail = session?.user?.email as string;
  const currentUser = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  const currentUserId = currentUser?.id;

  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;

  if (!restaurant) {
    return notFound();
  }
  if (role !== 'ADMIN' && restaurant.postedById !== currentUserId) {
    return notFound();
  }

  return (
    <main>
      {currentUserId ? (
        <main>
          <DeleteRestaurantForm
            restaurant={{ ...restaurant }}
            locations={locations}
            currentUserId={currentUserId}
          />
        </main>
      ) : (
        <main>Not logged in</main>
      )}
    </main>
  );
}
