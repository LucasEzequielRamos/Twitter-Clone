'use client'
import { deleteTweet } from '../lib/actions'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'

const ButtonDeleteTweet = ({ tweet_id }: { tweet_id: number }) => {
  return (
    <button onClick={async () => { await deleteTweet(tweet_id) }}>
      <IconTrash/>
    </button>
  )
}

export default ButtonDeleteTweet
