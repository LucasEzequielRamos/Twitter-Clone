-- CreateTable
CREATE TABLE `Tweets_likes` (
    `tweet_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`tweet_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tweets_likes` ADD CONSTRAINT `Tweets_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tweets_likes` ADD CONSTRAINT `Tweets_likes_tweet_id_fkey` FOREIGN KEY (`tweet_id`) REFERENCES `Tweets`(`tweet_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
