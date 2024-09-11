export async function getTweets (): Promise<any> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}api/posts`)
    if (res.status === 200) {
      const tweets = await res.json()
      return tweets
    } else return null
  } catch (error) {
    console.log(error)
  }
}
