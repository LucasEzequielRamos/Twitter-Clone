const usePostTweets = ({ fetchData }: { fetchData: () => Promise<void> }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const tweet = formData.get('tweet_content')
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tweet)
    })

    const textarea = document.querySelector('textarea')
    if (res?.status === 200 && textarea) {
      fetchData()
      textarea.value = ''
    }
  }

  return { handleSubmit }
}

export default usePostTweets
