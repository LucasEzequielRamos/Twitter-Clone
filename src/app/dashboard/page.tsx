import InputTweets from '../../components/input-tweets'
import TweetsList from '../../components/tweet-list'
import ProfileHeader from '../../components/profile-header'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
  const session = await getServerSession()
  if (!session) redirect('/auth/login')
  return (
    <section className='w-[600px] m-auto flex flex-col'>
      <ProfileHeader/>
      <main className='flex justify-center items-center flex-col'>
        <InputTweets/>
        <TweetsList/>
      </main>
    </section>
  )
}

export default Dashboard
