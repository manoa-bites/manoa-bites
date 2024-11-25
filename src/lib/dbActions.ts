'use server';

import { Stuff, Condition, Topic, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string; role?: Role }) {
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
export async function changePassword(credentials: { email: string; password: string }) {
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
  description: string
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

export async function addFavorite(favorites: { userFavoritedId: number; restaurantFavoritedId: number }) {
  await prisma.favoriteRestaurant.create({
    data: {
      userFavoritedId: favorites.userFavoritedId,
      restaurantFavoritedId: favorites.restaurantFavoritedId,
    },
  });
}
