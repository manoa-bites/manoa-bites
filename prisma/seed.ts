import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    let role: Role = 'USER';
    if (account.role === 'ADMIN') {
      role = 'ADMIN';
    }
    if (account.role === 'VENDOR') {
      role = 'VENDOR';
    }
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });
  config.defaultData.forEach(async (data, index) => {
    let condition: Condition = 'good';
    if (data.condition === 'poor') {
      condition = 'poor';
    } else if (data.condition === 'excellent') {
      condition = 'excellent';
    } else {
      condition = 'fair';
    }
    console.log(`  Adding stuff: ${data.name} (${data.owner})`);
    await prisma.stuff.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  });
  const locationMap = new Map();
  config.defaultLocations.forEach(async (location) => {
    const createdLocation = await prisma.location.upsert({
      where: { name: location.name },
      update: {},
      create: {
        name: location.name,
      },
    });
    locationMap.set(location.name, createdLocation.id);
  });
  config.defaultRestaurants.forEach(async (restaurant) => {
    const user = await prisma.user.findUnique({
      where: { id: restaurant.postedById },
    });

    const location = await prisma.location.findUnique({
      where: { id: restaurant.locationId },
    });

    if (user && location) {
      await prisma.restaurant.upsert({
        where: { name: restaurant.name },
        update: {},
        create: {
          id: restaurant.id,
          name: restaurant.name,
          locationId: location?.id,
          postedById: user.id,
          website: restaurant.website,
          phone: restaurant.phone,
          menuLink: restaurant.menuLink,
          onlineOrderLink: restaurant.onlineOrderLink,
        },
      });
    }
  });

  config.defaultFavorites.forEach(async (favorite) => {
    // Find the restaurant based on its ID
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: favorite.restaurantId },
    });

    if (!restaurant) {
      console.error(`Restaurant with id ${favorite.restaurantId} not found.`);
      return;
    }

    // Update the user's favorites to include this restaurant
    await prisma.user.update({
      where: { id: favorite.userId },
      data: {
        favorites: {
          connect: { id: favorite.restaurantId },
        },
      },
    });
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
