-- AddForeignKey
ALTER TABLE "FavoriteRestaurant" ADD CONSTRAINT "FavoriteRestaurant_userFavoritedId_fkey" FOREIGN KEY ("userFavoritedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRestaurant" ADD CONSTRAINT "FavoriteRestaurant_restaurantFavoritedId_fkey" FOREIGN KEY ("restaurantFavoritedId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
