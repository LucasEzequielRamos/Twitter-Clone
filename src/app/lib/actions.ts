'use server'

import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const postTweet = async (formData: FormData) => {
  const session = await getServerSession()
  const content = formData.get('tweet_content')
  const res = await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content, session })
  })
  revalidatePath('/dashboard')
  formData.set('tweet_content', '')
  console.log(await res.json())
}

export const deleteTweet = async (tweet_id: number) => {
  const session = await getServerSession()
  const res = await fetch('http://localhost:3000/api/posts', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tweet_id, session })
  })
  revalidatePath('/dashboard')
  console.log(await res.json())
}
