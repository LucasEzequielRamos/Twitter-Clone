export async function getProfileTweets (userId: number | null): Promise<any> {
  const res = await fetch(`http://twitter-clone-ac2aldhg9-lucasezequielbecerra.vercel.app/api/posts/${userId}`)
  if (res.status === 200) {
    const tweets = await res.json()
    return tweets
  } else return null
}
