export async function getProfileTweets (userId: number | null): Promise<any> {
  const res = await fetch(`http://twitter-clone-theta-bay.vercel.app/api/posts/${userId}`)
  if (res.status === 200) {
    const tweets = await res.json()
    return tweets
  } else return null
}
