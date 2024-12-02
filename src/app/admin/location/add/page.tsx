import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { adminProtectedPage } from '@/lib/page-protection';
import AddLocationForm from '@/components/AddLocationForm';

const AddLocation = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  return (
    <main>
      <AddLocationForm />
    </main>
  );
};

export default AddLocation;
