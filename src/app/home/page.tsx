import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { fetchUserInfo } from '@/lib/getUserSession'
import InputTweets from '@/components/input-tweets'
import TweetsList from '@/components/tweet-list'

const page = async () => {
  const session = await getServerSession()
  if (!session) redirect('/auth/login')
  const { avatar_url } = await fetchUserInfo()
  return (
    <section className="lg:w-[600px] m-auto flex flex-col">
      <InputTweets profileImage={avatar_url} />
      <TweetsList page={undefined} userId={null}/>
    </section>
  )
}

export default page
