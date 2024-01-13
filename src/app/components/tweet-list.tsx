import TweetCard from './tweet-card'

const TweetsList = ({ tweets }: { tweets: any[] }) => {
  return (
    <div className='w-full'> { tweets.length > 0 ? tweets.map(tweet => { return <TweetCard key={tweet.tweet_id} user={tweet.user} tweet={tweet} /> }) : 'no hay tweets'}</div>
  )
}

export default TweetsList
