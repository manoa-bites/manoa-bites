'use client';

import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { adminVendorProtectedPage } from '@/lib/page-protection';
import AddRestaurantForm from '@/components/AddRestaurantForm';
import { prisma } from '@/lib/prisma';

const AddRestaurant = async () => {
  // Protect the page, only logged-in users can access it.
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

  // Define the onAddRestaurant function
  const onAddRestaurant = async (newRestaurant: {
    name: string;
    website?: string;
    phone?: string;
    hours?: string;
    description?: string;
    menuLink?: string;
    onlineOrderLink?: string;
    latitude?: number;
    longitude?: number;
    postedById: number;
    locationId?: number;
    image?: string;
  }) => {
    try {
      // Assuming this will create a new restaurant entry in the database
      const createdRestaurant = await prisma.restaurant.create({
        data: newRestaurant,
      });
      console.log('Restaurant added:', createdRestaurant);
      // Optionally, you can send a success message here or redirect the user
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  return (
    <main>
      <AddRestaurantForm
        currentUserId={currentUserId || null}
        locations={locations}
        onAddRestaurant={onAddRestaurant} // Passing the function as a prop
      />
    </main>
  );
};

export default AddRestaurant;
