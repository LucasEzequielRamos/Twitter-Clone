import InputTweets from '../../components/input-tweets'
import TweetsList from '../../components/tweet-list'
import ProfileHeader from '../../components/profile-header'

const Dashboard = () => {
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
