'use client'

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
const Dashboard = () => {
  const session = useSession()
  // console.log({ session })
  if (session.status === 'unauthenticated') {
    redirect('/auth/login')
  }

  const [tweets, setTweets] = useState('No hay tweets')

  const fetchdata = async () => {
    const res = await fetch('/api/posts')
    const tweets = await res.json()
    setTweets(tweets)
  }

  useEffect(() => {
    fetchdata()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const tweet = formData.get('tweet_content')
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tweet)
    })

    const textarea = document.querySelector('textarea')
    if (res?.status === 200 && textarea) {
      fetchdata()
      textarea.value = ''
    }
  }

  return (
    <section className='w-4/5 m-auto flex flex-col'>
      <header className='flex flex-col bg-blue-600 mb-36 p-3'>
        <h1 className='flex justify-center text-4xl'>Your profile</h1>
        <h2>Welcome @{session.data?.user?.name}</h2>
      </header>
      <main className='flex justify-center items-center flex-col'>
        <form className='flex flex-col border-2 border-blue-400 relative' onSubmit={handleSubmit} action="">
          <textarea className='bg-inherit border-b-[0.5px] border-blue-300 border-dotted p-2' placeholder='What`s happen' name="tweet_content" cols={50} rows={10}/>
          <button className='rounded-full bg-blue-600 w-fit p-2 self-end mr-4 my-4'>Publicar tweet</button>
        </form>
        {Array.isArray(tweets) && tweets.map(tweet => { return <p key={tweet.tweet_id}>{tweet.content}</p> })}
      </main>
    </section>
  )
}

export default Dashboard
