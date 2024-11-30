import { NextApiRequest } from 'next';
import { getRestaurantImageById } from '@/lib/dbActions';

const GET = async (
  req: NextApiRequest,
  { params }: { params: { restaurantId: string } },
) => {
  const { restaurantId } = params;

  const base64Image = await getRestaurantImageById(Number(restaurantId));

  if (!base64Image) {
    console.log('No image found');
    return new Response('Restaurant or image not found', {
      status: 404,
    });
  }

  try {
    const imageBuffer = Buffer.from(base64Image.split(',')[1], 'base64');
    const mimeType = base64Image.split(';')[0].split(':')[1] || 'image/png';

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (e) {
    return new Response(
      'Uh uh, something went wrong decoding the base64 image.',
      {
        status: 500,
      },
    );
  }
};

export default GET;
