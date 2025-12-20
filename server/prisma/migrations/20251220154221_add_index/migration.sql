/*
  Warnings:

  - Added the required column `restaurant_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Made the column `country_id` on table `Cart` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_country_id_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cart_id_fkey";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "restaurant_id" INTEGER NOT NULL,
ALTER COLUMN "country_id" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Cart_country_id_idx" ON "Cart"("country_id");

-- CreateIndex
CREATE INDEX "CartItem_cart_id_idx" ON "CartItem"("cart_id");

-- CreateIndex
CREATE INDEX "Restaurant_country_id_idx" ON "Restaurant"("country_id");

-- CreateIndex
CREATE INDEX "RestaurantItem_restaurant_id_idx" ON "RestaurantItem"("restaurant_id");

-- CreateIndex
CREATE INDEX "User_country_id_idx" ON "User"("country_id");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
