import InputTweets from '@/components/input-tweets'
import TweetsList from '@/components/tweet-list'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getServerSession()
  if (!session) redirect('/auth/login')
  return (
    <section className="w-[600px] m-auto flex flex-col">
      <InputTweets/>
      <TweetsList/>
    </section>
  )
}

export default page
