/*
  Warnings:

  - You are about to drop the column `table_cradit` on the `table` table. All the data in the column will be lost.
  - Added the required column `sub_code` to the `subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subject` ADD COLUMN `sub_code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `table` DROP COLUMN `table_cradit`;
