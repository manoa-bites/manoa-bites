import { NextRequest } from 'next/server';
import { getRestaurantImageById } from '@/lib/dbActions';

export async function GET(
  req: NextRequest,
  { params }: { params: { restaurantId: string } },
): Promise<Response> {
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
    console.error('Error decoding base64 image:', e);
    return new Response(
      'Uh oh, something went wrong decoding the base64 image.',
      {
        status: 500,
      },
    );
  }
}

export async function POST(): Promise<Response> {
  return new Response('Unauthorized', { status: 403 });
}

export async function PUT(): Promise<Response> {
  return new Response('Unauthorized', { status: 403 });
}

export async function DELETE(): Promise<Response> {
  return new Response('Unauthorized', { status: 403 });
}

export async function PATCH(): Promise<Response> {
  return new Response('Unauthorized', { status: 403 });
}

export async function OPTIONS(): Promise<Response> {
  return new Response('Unauthorized', { status: 403 });
}

export async function HEAD(): Promise<Response> {
  return new Response('Unauthorized', { status: 403 });
}
