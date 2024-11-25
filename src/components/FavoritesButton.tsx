import { useSession } from 'next-auth/react'; // Assuming you're using next-auth
import { Button } from 'react-bootstrap';
import { Heart } from 'react-bootstrap-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { addFavorite } from '@/lib/dbActions';
import { redirect } from 'next/navigation';
import { FavoriteSchema } from '@/lib/validationSchemas';
import { Restaurant } from '@prisma/client';
import LoadingSpinner from './LoadingSpinner';

const FavoriteButton = ({ restaurant }: { restaurant: Restaurant }) => {
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FavoriteSchema),
  });

  // Handling loading and unauthenticated states
  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  // On submit handler
  const onSubmit = async (data: { userFavoritedId: number, restaurantFavoritedId: number }) => {
    // Assuming `addFavorite` is a function that adds the favorite to the database
    await addFavorite(data);
    swal('Success', 'Your favorite has been added!', 'success', {
      timer: 2000,
    });
  };

  // Explicitly cast the session user to your custom type
  const userId = (session?.user as { id: string })?.id;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('userFavoritedId')} value={userId} />
      <input type="hidden" {...register('restaurantFavoritedId')} value={restaurant.id} />

      <Button
        type="submit"
        variant="secondary"
        onClick={() => {
          if (!session) {
            swal('Error', 'You must be logged in to add favorites.', 'error', {
              timer: 2000,
            });
          }
        }}
      >
        <Heart />
        {' '}
        Add to Favorites
      </Button>
    </form>
  );
};

export default FavoriteButton;
