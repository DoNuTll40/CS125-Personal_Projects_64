/*
  Warnings:

  - Added the required column `sched_number` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `sched_number` INTEGER NOT NULL;
