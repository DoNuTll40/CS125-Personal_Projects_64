/*
  Warnings:

  - You are about to alter the column `b_create_at` on the `banner` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `b_enddate` on the `banner` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `banner` MODIFY `b_create_at` TIMESTAMP NOT NULL,
    MODIFY `b_enddate` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Visit` (
    `vs_id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `ipAddress` VARCHAR(191) NOT NULL DEFAULT 'IP not available',
    `userAgent` VARCHAR(191) NOT NULL,
    `appName` VARCHAR(191) NOT NULL,
    `appVersion` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `vendor` VARCHAR(191) NOT NULL,
    `screenWidth` INTEGER NOT NULL,
    `screenHeight` INTEGER NOT NULL,
    `screenColorDepth` INTEGER NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `pageViewed` VARCHAR(191) NOT NULL,
    `visitCount` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`vs_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
