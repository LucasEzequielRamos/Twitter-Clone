import { getProfileTweets } from '@/lib/getProfileTweets'
import { getTweets } from '../lib/getTweets'
import { fetchUserInfo } from '../lib/getUserSession'
import TweetCard from './tweet-card'

const TweetsList = async ({ userId, page }: { userId: number, page: any }) => {
  const tweets = await getTweets()
  const myTweets = await getProfileTweets(userId)
  const user = await fetchUserInfo()
  return (
    page === 'dashboard'
      ? <div className='w-full'> { myTweets.length > 0 ? myTweets.map((tweet: any) => { return <TweetCard key={tweet.tweet_id} user={tweet.user} tweet={tweet} userSession={user} /> }) : 'no hay tweets'}</div>
      : <div className='w-full'> { tweets.length > 0 ? tweets.map((tweet: any) => { return <TweetCard key={tweet.tweet_id} user={tweet.user} tweet={tweet} userSession={user} /> }) : 'no hay tweets'}</div>
  )
}

export default TweetsList
