import InputTweets from '@/components/input-tweets'
import TweetsList from '@/components/tweet-list'
import { fetchUserInfo } from '@/lib/getUserSession'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getServerSession()
  if (!session) redirect('/auth/login')
  const { avatar_url } = await fetchUserInfo()
  return (
    <section className="w-[600px] m-auto flex flex-col">
      <InputTweets profileImage={avatar_url} />
      <TweetsList page={undefined} userId={null}/>
    </section>
  )
}

export default page
