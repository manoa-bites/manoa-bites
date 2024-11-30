import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { adminVendorProtectedPage } from '@/lib/page-protection';
import AddRestaurantForm from '@/components/AddRestaurantForm';
import { prisma } from '@/lib/prisma';

const AddRestaurant = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  adminVendorProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const currentUserEmail = session?.user?.email as string;
  const currentUser = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  const currentUserId = currentUser?.id;

  const locations = await prisma.location.findMany({});

  return (
    <main>
      <AddRestaurantForm
        currentUserId={currentUserId || null}
        locations={locations}
      />
    </main>
  );
};

export default AddRestaurant;
