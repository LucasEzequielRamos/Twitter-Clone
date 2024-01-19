// import { getTweets } from '@/lib/getTweets'
import { getTweets } from '@/lib/getTweets'
import TweetCard from './tweet-card'

const TweetsList = async () => {
  const tweets = await getTweets()
  return (
    <div className='w-full'> { tweets.length > 0 ? tweets.map((tweet: any) => { return <TweetCard key={tweet.tweet_id} user={tweet.user} tweet={tweet} /> }) : 'no hay tweets'}</div>
  )
}

export default TweetsList
