/*
  Warnings:

  - The primary key for the `alarm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `alarm` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `category_id` on the `alarm` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `mission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `store_id` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `myalarm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `alarm_id` on the `myalarm` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `myalarm` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `myfood` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `user_id` on the `myfood` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `mymission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `user_id` on the `mymission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `mission_id` on the `mymission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `mystore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `user_id` on the `mystore` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `store_id` on the `mystore` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `mystore` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `qna` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `qna` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `qna` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `region` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `region` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `store_id` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `store` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `owner_id` on the `store` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `region_id` on the `store` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `point` on the `user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `mission` DROP FOREIGN KEY `Mission_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `myalarm` DROP FOREIGN KEY `MyAlarm_alarm_id_fkey`;

-- DropForeignKey
ALTER TABLE `myalarm` DROP FOREIGN KEY `MyAlarm_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `myfood` DROP FOREIGN KEY `MyFood_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `mymission` DROP FOREIGN KEY `MyMission_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `mymission` DROP FOREIGN KEY `MyMission_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `mystore` DROP FOREIGN KEY `MyStore_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `mystore` DROP FOREIGN KEY `MyStore_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `qna` DROP FOREIGN KEY `QnA_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `store` DROP FOREIGN KEY `Store_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `store` DROP FOREIGN KEY `Store_region_id_fkey`;

-- AlterTable
ALTER TABLE `alarm` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `category_id` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `mission` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `store_id` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `myalarm` DROP PRIMARY KEY,
    MODIFY `alarm_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`alarm_id`, `user_id`);

-- AlterTable
ALTER TABLE `myfood` DROP PRIMARY KEY,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`user_id`, `food_id`);

-- AlterTable
ALTER TABLE `mymission` DROP PRIMARY KEY,
    MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `mission_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`user_id`, `mission_id`);

-- AlterTable
ALTER TABLE `mystore` DROP PRIMARY KEY,
    MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `store_id` INTEGER NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `qna` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `region` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `review` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NULL,
    MODIFY `store_id` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `store` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `owner_id` INTEGER NULL,
    MODIFY `region_id` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `point` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `Region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyMission` ADD CONSTRAINT `MyMission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyMission` ADD CONSTRAINT `MyMission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `Mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyFood` ADD CONSTRAINT `MyFood_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyStore` ADD CONSTRAINT `MyStore_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyStore` ADD CONSTRAINT `MyStore_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyAlarm` ADD CONSTRAINT `MyAlarm_alarm_id_fkey` FOREIGN KEY (`alarm_id`) REFERENCES `Alarm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyAlarm` ADD CONSTRAINT `MyAlarm_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QnA` ADD CONSTRAINT `QnA_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
