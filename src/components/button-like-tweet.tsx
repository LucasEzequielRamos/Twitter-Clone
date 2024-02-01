'use client'
import { updateTweet } from '../lib/postActions'
import React from 'react'

const ButtonLikeTweet = ({ tweet_id, children }: { tweet_id: number, children: React.ReactNode }) => {
  return (
    <button onClick={async () => { await updateTweet(tweet_id) }}>
      {children}
    </button>
  )
}

export default ButtonLikeTweet
