/*
  Warnings:

  - You are about to drop the `_Favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Favorites" DROP CONSTRAINT "_Favorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_Favorites" DROP CONSTRAINT "_Favorites_B_fkey";

-- DropTable
DROP TABLE "_Favorites";

-- CreateTable
CREATE TABLE "FavoriteRestaurant" (
    "id" SERIAL NOT NULL,
    "userFavoritedId" INTEGER NOT NULL,
    "restaurantFavoritedId" INTEGER NOT NULL,

    CONSTRAINT "FavoriteRestaurant_pkey" PRIMARY KEY ("id")
);
