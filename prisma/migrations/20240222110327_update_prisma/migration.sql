/*
  Warnings:

  - You are about to drop the column `sched_number` on the `schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `room` MODIFY `room_number` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `sched_number`;
