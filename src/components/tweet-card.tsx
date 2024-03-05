import { IconHeart, IconMessageCircle, IconRepeat } from '@tabler/icons-react'
import React from 'react'
import ButtonDeleteTweet from './button-delete-tweet'
import ButtonLikeTweet from './button-like-tweet'

interface tweet {
  tweet_id: number
  num_likes: number
  content: string
  user_id: number
  num_comments: number
  num_retweets: number
  created_at: string
}

const TweetCard = ({ user, tweet, userSession }: { user: any, tweet: tweet, userSession: any }) => {
  const paintHeart = userSession.likes?.find((like: any) => like.tweet_id === tweet.tweet_id)
  return (
    <article className=' border-x-[1px] border-b-[1px] w-full border-gray-500'>
      <div className='flex p-3'>
        <div className=' flex pr-3'>
          <picture className='rounded-full size-10 bg-gray-700 object-contain'>
            <img className='rounded-full h-full w-full' src={user?.avatar_url} alt={user?.avatar_url} />
          </picture>
        </div>
        <div className='flex flex-1 flex-col gap-4'>
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <a href={`/dashboard/${user.id}`} className='font-bold'>{user.full_name}</a>
              <p className='text-gray-600'>@{user.user_nick}</p>
            </div>
            {
              tweet.user_id === userSession.id
                ? <ButtonDeleteTweet tweet_id={tweet.tweet_id} owner={tweet.user_id} user_id={userSession.id}/>
                : ''
            }
          </div>
          <p className='h-auto lg:w-[450px] w-[280px] break-words'>{tweet.content}</p>
          <div className='flex w-3/4 justify-around [&>button]:flex [&>button]:gap-2'>
            <button><IconMessageCircle/></button>
            <button><IconRepeat/></button>
            <ButtonLikeTweet tweet_id={tweet.tweet_id} ><IconHeart fill={paintHeart ? 'red' : 'black'} color={paintHeart ? 'red' : 'white'}/>  {tweet.num_likes === 0 ? '' : tweet.num_likes}</ButtonLikeTweet>
          </div>
        </div>
      </div>
    </article>
  )
}

export default TweetCard
