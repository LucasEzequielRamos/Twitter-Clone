-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_nick` VARCHAR(20) NOT NULL,
    `email_address` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `phonenumber` CHAR(15) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `password` VARCHAR(255) NULL,
    `avatar_url` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `birthday` VARCHAR(255) NULL,

    UNIQUE INDEX `Users_user_nick_key`(`user_nick`),
    UNIQUE INDEX `email`(`email_address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Followers` (
    `follower_id` INTEGER NOT NULL,
    `following_id` INTEGER NOT NULL,

    PRIMARY KEY (`follower_id`, `following_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tweets` (
    `tweet_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `content` VARCHAR(280) NOT NULL,
    `num_likes` INTEGER NOT NULL DEFAULT 0,
    `num_retweets` INTEGER NOT NULL DEFAULT 0,
    `num_comments` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`tweet_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tweets_likes` (
    `tweet_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`tweet_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Followers` ADD CONSTRAINT `Followers_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Followers` ADD CONSTRAINT `Followers_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tweets` ADD CONSTRAINT `Tweets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tweets_likes` ADD CONSTRAINT `Tweets_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tweets_likes` ADD CONSTRAINT `Tweets_likes_tweet_id_fkey` FOREIGN KEY (`tweet_id`) REFERENCES `Tweets`(`tweet_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
