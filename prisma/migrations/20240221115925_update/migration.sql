/*
  Warnings:

  - You are about to drop the column `class_number` on the `class` table. All the data in the column will be lost.
  - Added the required column `class_name` to the `class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `class` DROP COLUMN `class_number`,
    ADD COLUMN `class_name` VARCHAR(191) NOT NULL;
