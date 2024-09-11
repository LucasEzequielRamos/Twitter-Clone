'use server'

import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export const postTweet = async (formData: FormData, session: any) => {
  try {
    const content = formData.get('tweet_content')
    await fetch(`${process.env.NEXTAUTH_URL}api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content, session })
    })
    revalidateTag('posts')
  } catch (error) {
    console.log(error)
  }
}

export const deleteTweet = async (tweet_id: number, user_id: number, owner: number) => {
  try {
    if (owner === user_id) {
      const session = await getServerSession()
      await fetch(`${process.env.NEXTAUTH_URL}api/posts`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tweet_id, session })
      })
      revalidateTag('posts')
    } else {
      throw new Error('this tweet is not your')
    }
  } catch (error: any) {
    console.log(error.message)
  }
}

export const updateTweet = async (tweet_id: number) => {
  try {
    const session = await getServerSession()
    await fetch(`${process.env.NEXTAUTH_URL}api/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tweet_id, session })
    })
    revalidateTag('likes')
  } catch (error) {
    console.log(error)
  }
}
