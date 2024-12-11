/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        locationId: true,
      },
    });

    // Convert Decimal to number for latitude and longitude
    const formattedRestaurants = restaurants.map((restaurant) => ({
      ...restaurant,
      latitude: restaurant.latitude ? Number(restaurant.latitude) : null,
      longitude: restaurant.longitude ? Number(restaurant.longitude) : null,
    }));

    console.log('Fetched Restaurants:', formattedRestaurants);
    return NextResponse.json(formattedRestaurants, { status: 200 });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}
