/*
  Warnings:

  - Added the required column `is_shared` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `CartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_user_id_fkey";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "is_shared" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
