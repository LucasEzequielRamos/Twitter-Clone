'use server'

import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export const postTweet = async (formData: FormData) => {
  try {
    const session = await getServerSession()
    const content = formData.get('tweet_content')
    await fetch('http://localhost:3000/api/posts', {
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

export const deleteTweet = async (tweet_id: number) => {
  try {
    const session = await getServerSession()
    await fetch('http://localhost:3000/api/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tweet_id, session })
    })
    revalidateTag('posts')
  } catch (error) {
    console.log(error)
  }
}

export const updateTweet = async (tweet_id: number) => {
  try {
    const session = await getServerSession()
    await fetch('http://localhost:3000/api/likes', {
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
    await fetch('http://localhost:3000/api/upload-avatar', {
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
