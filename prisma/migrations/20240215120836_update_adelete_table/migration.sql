/*
  Warnings:

  - You are about to drop the column `major_type` on the `major` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `major` table. All the data in the column will be lost.
  - You are about to drop the column `sec_teacher` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `class_id` on the `section` table. All the data in the column will be lost.
  - You are about to drop the column `sec_number` on the `section` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `section` table. All the data in the column will be lost.
  - You are about to drop the `sec_teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teacher` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_identity]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sec_id` to the `class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sec_type` to the `section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major_id` to the `subject` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_firstname` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_lastname` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_nickname` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_phone` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_address` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_brithday` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_identity` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `major` DROP FOREIGN KEY `major_subject_id_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `room_sec_teacher_fkey`;

-- DropForeignKey
ALTER TABLE `sec_teacher` DROP FOREIGN KEY `sec_teacher_section_id_fkey`;

-- DropForeignKey
ALTER TABLE `sec_teacher` DROP FOREIGN KEY `sec_teacher_teacher_id_fkey`;

-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `section_class_id_fkey`;

-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `section_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_class_id_fkey`;

-- AlterTable
ALTER TABLE `builds` ADD COLUMN `build_image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `class` ADD COLUMN `sec_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `major` DROP COLUMN `major_type`,
    DROP COLUMN `subject_id`;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `sec_teacher`;

-- AlterTable
ALTER TABLE `section` DROP COLUMN `class_id`,
    DROP COLUMN `sec_number`,
    DROP COLUMN `user_id`,
    ADD COLUMN `sec_type` ENUM('PRIMARY1', 'PRIMARY2', 'SECONDARY1', 'SECONDARY2') NOT NULL;

-- AlterTable
ALTER TABLE `subject` ADD COLUMN `major_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `user_image` VARCHAR(191) NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU',
    MODIFY `user_firstname` VARCHAR(191) NOT NULL,
    MODIFY `user_lastname` VARCHAR(191) NOT NULL,
    MODIFY `user_nickname` VARCHAR(191) NOT NULL,
    MODIFY `user_email` VARCHAR(191) NOT NULL,
    MODIFY `user_phone` VARCHAR(191) NOT NULL,
    MODIFY `user_address` VARCHAR(191) NOT NULL,
    MODIFY `user_brithday` DATE NOT NULL,
    MODIFY `user_identity` VARCHAR(16) NOT NULL;

-- DropTable
DROP TABLE `sec_teacher`;

-- DropTable
DROP TABLE `teacher`;

-- CreateTable
CREATE TABLE `table` (
    `table_id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_day` VARCHAR(191) NOT NULL,
    `table_time` VARCHAR(191) NOT NULL,
    `table_count` INTEGER NOT NULL DEFAULT 1,
    `class_id` INTEGER NOT NULL,
    `sub_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`table_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_user_identity_key` ON `users`(`user_identity`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject` ADD CONSTRAINT `subject_major_id_fkey` FOREIGN KEY (`major_id`) REFERENCES `major`(`major_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class` ADD CONSTRAINT `class_sec_id_fkey` FOREIGN KEY (`sec_id`) REFERENCES `section`(`sec_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `table` ADD CONSTRAINT `table_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `table` ADD CONSTRAINT `table_sub_id_fkey` FOREIGN KEY (`sub_id`) REFERENCES `subject`(`sub_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `table` ADD CONSTRAINT `table_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
