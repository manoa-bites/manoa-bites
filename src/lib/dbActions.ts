'use server';

import { Topic, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

export async function addLocation(data: { name: string }) {
  await prisma.location.create({ data: { name: data.name } });
  redirect('/admin');
}

export async function addRestaurant(data: {
  name: string;
  website?: string;
  phone?: string;
  hours?: string;
  description?: string;
  menuLink?: string;
  onlineOrderLink?: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  postedById: number;
  locationId?: number;
}) {
  await prisma.restaurant.create({
    data: {
      name: data.name,
      website: data.website || null,
      phone: data.phone || null,
      hours: data.hours || null,
      description: data.description || null,
      menuLink: data.menuLink || null,
      onlineOrderLink: data.onlineOrderLink || null,
      image: data.image || null,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      postedById: data.postedById,
      locationId: data.locationId || null,
    },
  });

  // Redirect to the list page after successfully adding the restaurant
  redirect('/admin');
}

export async function editRestaurant(data: {
  id: number;
  name: string;
  website?: string;
  phone?: string;
  hours?: string;
  description?: string;
  menuLink?: string;
  onlineOrderLink?: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  postedById: number;
  locationId?: number;
}) {
  await prisma.restaurant.update({
    where: { id: data.id },
    data: {
      name: data.name,
      website: data.website || null,
      phone: data.phone || null,
      hours: data.hours || null,
      description: data.description || null,
      menuLink: data.menuLink || null,
      onlineOrderLink: data.onlineOrderLink || null,
      image: data.image || null,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      postedById: data.postedById,
      locationId: data.locationId || null,
    },
  });

  // Redirect to the list page after successfully adding the restaurant
  redirect('/admin');
}

export async function deleteRestaurant(data: { id: number }) {
  await prisma.restaurant.deleteMany({
    where: { id: data.id },
  });

  redirect('/admin');
}

export async function editLocation(data: { id: number; name: string }) {
  await prisma.location.update({
    where: { id: data.id },
    data: { name: data.name },
  });
}

export async function deleteLocation(data: { id: number }) {
  await prisma.location.deleteMany({
    where: { id: data.id },
  });
}

export async function getRestaurantImageById(restaurantId: number) {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
  });
  return restaurant?.image;
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: {
  email: string;
  password: string;
  role?: Role;
}) {
  const { email, password, role } = credentials;

  const hashedPassword = await hash(password, 10);

  // Save user with the role (using the Role enum)
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || Role.USER, // Default to Role.USER if no role is provided
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: {
  email: string;
  password: string;
}) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

export async function reportIssue(issue: {
  name?: string;
  contactinfo?: string;
  topic: string;
  description: string;
}) {
  let topic: Topic = 'other';
  if (issue.topic === 'bug') {
    topic = 'bug';
  } else if (issue.topic === 'feature') {
    topic = 'feature';
  } else if (issue.topic === 'wronginformation') {
    topic = 'wronginformation';
  } else {
    topic = 'other';
  }
  await prisma.issue.create({
    data: {
      topic,
      name: issue.name,
      contactinfo: issue.contactinfo,
      description: issue.description,
    },
  });
  redirect('src/app/page.tsx');
}

export async function isRestaurantFavorited(
  userFavoriteEmail: string,
  restaurantFavoritedId: number,
) {
  const currentUser = await prisma.user.findUnique({
    where: {
      email: userFavoriteEmail,
    },
  });
  const currentUserId = currentUser?.id;

  if (!currentUserId) {
    throw new Error('User not found');
  }

  const existingFavorite = await prisma.favoriteRestaurant.findFirst({
    where: {
      userFavoritedId: currentUserId,
      restaurantFavoritedId,
    },
  });

  if (existingFavorite) {
    return true;
  }

  return false;
}

export async function addFavorite(favorites: {
  userFavoriteEmail: string;
  restaurantFavoritedId: number;
}) {
  const currentUser = await prisma.user.findUnique({
    where: {
      email: favorites.userFavoriteEmail,
    },
  });
  const currentUserId = currentUser?.id;

  if (!currentUserId) {
    throw new Error('User not found');
  }

  const restaurantFavorited = await isRestaurantFavorited(
    favorites.userFavoriteEmail,
    favorites.restaurantFavoritedId,
  );
  if (restaurantFavorited) {
    console.log('Favorite already exists');
    return;
  }

  await prisma.favoriteRestaurant.create({
    data: {
      userFavoritedId: currentUserId,
      restaurantFavoritedId: favorites.restaurantFavoritedId,
    },
  });

  console.log('Favorite added successfully');
}

export async function removeFavorite(favorites: {
  userFavoriteEmail: string;
  restaurantFavoritedId: number;
}) {
  const currentUser = await prisma.user.findUnique({
    where: {
      email: favorites.userFavoriteEmail,
    },
  });
  const currentUserId = currentUser?.id;

  if (!currentUserId) {
    throw new Error('User not found');
  }

  const restaurantFavorited = await isRestaurantFavorited(
    favorites.userFavoriteEmail,
    favorites.restaurantFavoritedId,
  );
  if (!restaurantFavorited) {
    console.log('No favorite found');
    return;
  }

  await prisma.favoriteRestaurant.deleteMany({
    where: {
      userFavoritedId: currentUserId,
      restaurantFavoritedId: favorites.restaurantFavoritedId,
    },
  });

  console.log('Favorite(s) remove successfully!');
}

export async function deleteIssue(data: { id: number }) {
  await prisma.issue.deleteMany({
    where: { id: data.id },
  });
}
