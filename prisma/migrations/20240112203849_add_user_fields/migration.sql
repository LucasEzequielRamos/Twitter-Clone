/*
  Warnings:

  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    ADD COLUMN `avatar_url` VARCHAR(255) NULL,
    ADD COLUMN `description` VARCHAR(255) NULL,
    ADD COLUMN `full_name` VARCHAR(255) NOT NULL,
    MODIFY `phonenumber` CHAR(15) NULL,
    MODIFY `password` VARCHAR(255) NULL;
