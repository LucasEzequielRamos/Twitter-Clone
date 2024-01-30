'use client'
import { postTweet } from '../lib/actions'
import { useRef } from 'react'

const InputTweets = () => {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} className='flex flex-col border-2 border-gray-500 relative w-full' action={async (formData) => {
      await postTweet(formData)
      formRef.current?.reset()
    }}>
      <textarea className='bg-inherit border-b-[0.5px] border-gray-500 border-dotted p-2' placeholder='What`s happen' name="tweet_content" rows={10}/>
      <button className='rounded-full bg-blue-600 w-fit p-2 self-end mr-4 my-4'>Post tweet</button>
    </form>
  )
}

export default InputTweets
