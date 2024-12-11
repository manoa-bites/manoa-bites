import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Restaurant } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditRestaurantForm from '@/components/EditRestaurantForm';

export default async function EditRestaurant({
  params,
}: {
  params: { restaurantId: string | string[] };
}) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const id = Number(params.restaurantId);
  console.log(id);

  const restaurant: Restaurant | null = await prisma.restaurant.findUnique({
    where: { id },
  });

  if (!restaurant) {
    return notFound();
  }

  // Convert Decimal to Number for latitude and longitude
  const formattedRestaurant = {
    ...restaurant,
    latitude: restaurant.latitude ? Number(restaurant.latitude) : null,
    longitude: restaurant.longitude ? Number(restaurant.longitude) : null,
  };

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

  if (role !== 'ADMIN' && restaurant.postedById !== currentUserId) {
    return notFound();
  }

  return (
    <main>
      {currentUserId ? (
        <main>
          <EditRestaurantForm
            restaurant={formattedRestaurant} // Pass the updated object
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
