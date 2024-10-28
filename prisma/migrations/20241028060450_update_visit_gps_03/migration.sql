/*
  Warnings:

  - You are about to alter the column `b_create_at` on the `banner` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `b_enddate` on the `banner` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `mapURL` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Visit` ADD COLUMN `mapURL` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `banner` MODIFY `b_create_at` TIMESTAMP NOT NULL,
    MODIFY `b_enddate` DATETIME NOT NULL;
