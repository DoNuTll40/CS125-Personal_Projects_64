/*
  Warnings:

  - You are about to drop the column `sub_day` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the column `sub_time` on the `subject` table. All the data in the column will be lost.
  - Added the required column `table_cradit` to the `table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subject` DROP COLUMN `sub_day`,
    DROP COLUMN `sub_time`;

-- AlterTable
ALTER TABLE `table` ADD COLUMN `table_cradit` VARCHAR(191) NOT NULL;
