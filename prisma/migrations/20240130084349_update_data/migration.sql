-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_username` VARCHAR(191) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `user_role` ENUM('USER', 'ADMIN', 'TEACHER') NOT NULL DEFAULT 'USER',
    `user_firstname` VARCHAR(191) NULL,
    `user_lastname` VARCHAR(191) NULL,
    `user_nickname` VARCHAR(191) NULL,
    `user_email` VARCHAR(191) NULL,
    `user_phone` VARCHAR(191) NULL,
    `user_address` VARCHAR(191) NULL,
    `user_brithday` DATE NULL,
    `user_identity` INTEGER NULL,
    `class_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher` (
    `teacher_id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacher_firstname` VARCHAR(191) NOT NULL,
    `teacher_lastname` VARCHAR(191) NOT NULL,
    `teacher_nickname` VARCHAR(191) NULL,
    `teacher_email` VARCHAR(191) NULL,
    `teacher_phone` VARCHAR(191) NOT NULL,
    `teacher_address` VARCHAR(191) NOT NULL,
    `teacher_brithday` DATE NOT NULL,

    PRIMARY KEY (`teacher_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject` (
    `sub_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub_name` VARCHAR(191) NOT NULL,
    `sub_day` VARCHAR(191) NOT NULL,
    `sub_time` VARCHAR(191) NULL,
    `room_id` INTEGER NOT NULL,

    PRIMARY KEY (`sub_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `major` (
    `major_id` INTEGER NOT NULL AUTO_INCREMENT,
    `major_name` VARCHAR(191) NOT NULL,
    `major_type` ENUM('MATH', 'SCIENCE', 'THAI', 'ART', 'HISTORY', 'GEOGRAPHY', 'BIOLOGY', 'CHEMISTRY', 'PHYSICS', 'ENGLISH', 'PHYSICAL_EDUCATION') NOT NULL,
    `subject_id` INTEGER NOT NULL,

    PRIMARY KEY (`major_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room` (
    `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_name` VARCHAR(191) NOT NULL,
    `room_number` INTEGER NOT NULL,
    `build_id` INTEGER NOT NULL,
    `sec_teacher` INTEGER NOT NULL,

    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `builds` (
    `build_id` INTEGER NOT NULL AUTO_INCREMENT,
    `build_name` VARCHAR(191) NOT NULL,
    `build_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`build_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `section` (
    `sec_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sec_number` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `class_id` INTEGER NOT NULL,

    PRIMARY KEY (`sec_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sec_teacher` (
    `st_id` INTEGER NOT NULL AUTO_INCREMENT,
    `section_id` INTEGER NOT NULL,
    `teacher_id` INTEGER NOT NULL,

    PRIMARY KEY (`st_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class` (
    `class_id` INTEGER NOT NULL AUTO_INCREMENT,
    `class_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`class_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject` ADD CONSTRAINT `subject_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `major` ADD CONSTRAINT `major_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `subject`(`sub_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_build_id_fkey` FOREIGN KEY (`build_id`) REFERENCES `builds`(`build_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_sec_teacher_fkey` FOREIGN KEY (`sec_teacher`) REFERENCES `sec_teacher`(`st_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sec_teacher` ADD CONSTRAINT `sec_teacher_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `section`(`sec_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sec_teacher` ADD CONSTRAINT `sec_teacher_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;
