-- AlterTable
ALTER TABLE `users` MODIFY `user_identity` VARCHAR(17) NOT NULL;

-- CreateTable
CREATE TABLE `banner` (
    `b_id` INTEGER NOT NULL AUTO_INCREMENT,
    `b_url` VARCHAR(191) NOT NULL,
    `b_header` VARCHAR(191) NOT NULL,
    `b_title` VARCHAR(191) NOT NULL,
    `b_status` INTEGER NOT NULL DEFAULT 0,
    `b_create_at` TIMESTAMP NOT NULL,
    `b_enddate` DATETIME NOT NULL,

    PRIMARY KEY (`b_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
