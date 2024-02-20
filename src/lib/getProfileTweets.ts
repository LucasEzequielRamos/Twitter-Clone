export async function getProfileTweets (userId: number | null): Promise<any> {
  const res = await fetch(`http://localhost:3000/api/posts/${userId}`)
  if (res.status === 200) {
    const tweets = await res.json()
    return tweets
  } else return null
}
