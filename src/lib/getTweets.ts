export async function getTweets (): Promise<any> {
  try {
    const res = await fetch('http://twitter-clone-theta-bay.vercel.app/api/posts')
    if (res.status === 200) {
      const tweets = await res.json()
      console.log(tweets)
      return tweets
    } else return null
  } catch (error) {
    console.log(error)
  }
}
