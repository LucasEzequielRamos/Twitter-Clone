'use client'

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import InputTweets from '@/components/input-tweets'
import useGetTweets from '@/hooks/useGetTweets'
import usePostTweets from '@/hooks/usePostTweets'
import TweetsList from '@/components/tweet-list'
import ProfileHeader from '@/components/profile-header'

const Dashboard = () => {
  const session = useSession()
  if (session.status === 'unauthenticated') {
    redirect('/auth/login')
  }

  const { tweets, fetchData } = useGetTweets()

  const { handleSubmit } = usePostTweets({ fetchData })

  return (
    <section className='w-[600px] m-auto flex flex-col'>
      <ProfileHeader/>
      <main className='flex justify-center items-center flex-col'>
        <InputTweets handleSubmit={handleSubmit}/>
        <TweetsList tweets={tweets}/>
      </main>
    </section>
  )
}

export default Dashboard
