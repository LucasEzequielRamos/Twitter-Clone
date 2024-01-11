import { useEffect, useState } from 'react'

const useGetTweets = () => {
  const [tweets, setTweets] = useState<any[]>([])

  const fetchData = async (): Promise<any> => {
    const res = await fetch('/api/posts')
    if (res.status === 200) {
      const tweets = await res.json()
      setTweets(tweets)
    } else return null
  }
  useEffect(() => {
    fetchData()
  }, [])

  return { tweets, fetchData }
}

export default useGetTweets
