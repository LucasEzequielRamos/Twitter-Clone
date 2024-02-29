export async function getTweets (): Promise<any> {
  const res = await fetch('http://twitter-clone-theta-bay.vercel.app/api/posts')
  if (res.status === 200) {
    const tweets = await res.json()
    return tweets
  } else return null
}
