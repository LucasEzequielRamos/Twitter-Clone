'use client'
import { deleteTweet } from '../lib/postActions'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'

const ButtonDeleteTweet = ({ tweet_id, user_id, owner }: { tweet_id: number, user_id: number, owner: number }) => {
  return (
    <button onClick={async () => { await deleteTweet(tweet_id, user_id, owner) }}>
      <IconTrash/>
    </button>
  )
}

export default ButtonDeleteTweet
