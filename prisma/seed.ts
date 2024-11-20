import { PrismaClient, Role } from '@prisma/client';
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
  config.defaultLocations.forEach(async (location) => {
    await prisma.location.upsert({
      where: { name: location.name },
      update: {},
      create: {
        name: location.name,
      },
    });
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
          name: restaurant.name,
          locationId: location.id,
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
    await prisma.favoriteRestaurant.create({
      data: {
        userFavoritedId: favorite.userId,
        restaurantFavoritedId: favorite.restaurantId,
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
