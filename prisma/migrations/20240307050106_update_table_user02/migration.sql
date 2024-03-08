/*
  Warnings:

  - You are about to alter the column `user_nameprefix` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `user_nameprefix` VARCHAR(50) NOT NULL;
