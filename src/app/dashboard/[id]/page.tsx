import TweetsList from '../../../components/tweet-list'
import ProfileHeader from '../../../components/profile-header'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { fetchUserInfo } from '@/lib/getUserSession'

const Dashboard = async ({ params }: { params: { id: number } }) => {
  const { id } = params
  const [user, session] = await Promise.all([fetchUserInfo(), getServerSession()])
  
  if (!session) redirect('/auth/login')

  return (
    <section className='lg:w-[600px] m-auto flex flex-col'>
      <ProfileHeader profileId={Number(id)} userEmail={session.user?.email} userSessionId={user.id}/>
      <main className='flex justify-center items-center flex-col'>
        <TweetsList userId={Number(id)} page={'dashboard'}/>
      </main>
    </section>
  )
}

export default Dashboard
