'use server'

import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

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
    revalidatePath('/')
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
    revalidatePath('/')
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
    revalidatePath('/')
    return false
  } catch (error) {
    console.log(error)
  }
}
