'use server'

import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export const postTweet = async (formData: FormData) => {
  try {
    const session = await getServerSession()
    const content = formData.get('tweet_content')
    console.log(session, content)
    await fetch('http://twitter-clone-theta-bay.vercel.app/api/posts', {
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
      await fetch('http://twitter-clone-theta-bay.vercel.app/api/posts', {
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
    await fetch('http://twitter-clone-theta-bay.vercel.app/api/likes', {
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

export const updateProfilePhoto = async (formData: FormData) => {
  try {
    const session = await getServerSession()
    const avatar = formData.get('avatar_url')
    await fetch('http://twitter-clone-theta-bay.vercel.app/api/upload-avatar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar, session })
    })
    revalidateTag('users')
    return false
  } catch (error) {
    console.log(error)
  }
}
