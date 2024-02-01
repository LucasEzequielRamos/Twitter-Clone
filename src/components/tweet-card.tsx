import { IconHeart, IconMessageCircle, IconRepeat } from '@tabler/icons-react'
import React from 'react'
import ButtonDeleteTweet from './button-delete-tweet'
import ButtonLikeTweet from './button-like-tweet'

interface tweet {
  tweet_id: number
  num_likes: number
  content: string
}

const TweetCard = ({ user, tweet, userSession }: { user: any, tweet: tweet, userSession: any }) => {
  const paintHeart = userSession.likes[0]?.tweet_id === tweet.tweet_id
  return (
    <article className=' border-x-2 border-b-2 w-full border-gray-500'>
      <div className="flex p-3">
        <div className=" flex pr-3">
          <picture className='rounded-full w-10 h-10 bg-gray-700 object-contain'>
            <img className='rounded-full h-full' src={user?.avatar_url} alt={user?.avatar_url} />
          </picture>
        </div>
        <div className='flex flex-1 flex-col gap-4'>
          <div className="flex justify-between ">
            <div className='flex gap-2'>
              <p className='font-bold'>{user.full_name}</p>
              <p className='text-gray-600'>@{user.user_nick}</p>
            </div>
            <ButtonDeleteTweet tweet_id={tweet.tweet_id}/>
          </div>
          <div>{tweet.content}</div>
          <div className='flex w-3/4 justify-around [&>button]:flex [&>button]:gap-2'>
            <button><IconMessageCircle/></button>
            <button><IconRepeat/></button>
            <ButtonLikeTweet tweet_id={tweet.tweet_id} ><IconHeart fill={paintHeart ? 'red' : 'black'} color='red'/>  {tweet.num_likes === 0 ? '' : tweet.num_likes}</ButtonLikeTweet>
          </div>
        </div>
      </div>
    </article>
  )
}

export default TweetCard
