import { IconHeart, IconMessageCircle, IconRepeat } from '@tabler/icons-react'
import React from 'react'

const TweetCard = ({ user, content, likes }: { user: any, content: any, likes: any }) => {
  return (
    <article className=' border-x-2 border-b-2 w-full border-gray-500'>
      <div className="flex p-3">
        <div className=" flex pr-3">
          <picture className='rounded-full w-10 h-10 bg-gray-700'>
          </picture>
        </div>
        <div className='flex flex-1 flex-col gap-4'>
          <div className="flex justify-between ">
            <div className='flex gap-2'>
              <p className='font-bold'>{user.first_name}</p>
              <p className='text-gray-600'>@{user.user_nick}</p>
            </div>
            <div>...</div>
          </div>
          <div>{content}</div>
          <div className='flex w-3/4 justify-around [&>button]:flex [&>button]:gap-2'>
            <button><IconMessageCircle/></button>
            <button><IconRepeat/></button>
            <button><IconHeart/>{likes === 0 ? '' : likes}</button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default TweetCard