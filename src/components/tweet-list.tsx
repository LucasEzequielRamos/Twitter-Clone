// import { getTweets } from '@/lib/getTweets'
import { getTweets } from '../lib/getTweets'
import { fetchUserInfo } from '../lib/getUserSession'
import TweetCard from './tweet-card'

const TweetsList = async () => {
  const tweets = await getTweets()
  const user = await fetchUserInfo()
  return (
    <div className='w-full'> { tweets.length > 0 ? tweets.map((tweet: any) => { return <TweetCard key={tweet.tweet_id} user={tweet.user} userSession={user} tweet={tweet} /> }) : 'no hay tweets'}</div>
  )
}

export default TweetsList
