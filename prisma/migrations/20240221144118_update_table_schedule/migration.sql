/*
  Warnings:

  - You are about to drop the `table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `table` DROP FOREIGN KEY `table_class_id_fkey`;

-- DropForeignKey
ALTER TABLE `table` DROP FOREIGN KEY `table_sub_id_fkey`;

-- DropForeignKey
ALTER TABLE `table` DROP FOREIGN KEY `table_user_id_fkey`;

-- DropTable
DROP TABLE `table`;

-- CreateTable
CREATE TABLE `schedule` (
    `sched_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sched_day` VARCHAR(191) NOT NULL,
    `sched_time` VARCHAR(191) NOT NULL,
    `sched_count` INTEGER NOT NULL DEFAULT 1,
    `class_id` INTEGER NOT NULL,
    `sub_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`sched_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_sub_id_fkey` FOREIGN KEY (`sub_id`) REFERENCES `subject`(`sub_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
