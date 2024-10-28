/*
  Warnings:

  - The primary key for the `Visit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `vs_id` on the `Visit` table. All the data in the column will be lost.
  - You are about to alter the column `b_create_at` on the `banner` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `b_enddate` on the `banner` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `id` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Visit` DROP PRIMARY KEY,
    DROP COLUMN `vs_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `banner` MODIFY `b_create_at` TIMESTAMP NOT NULL,
    MODIFY `b_enddate` DATETIME NOT NULL;
