'use client'
import { postTweet } from '../lib/postActions'
import { useRef } from 'react'

const InputTweets = ({ profileImage }: { profileImage: string }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const content = formData.get('tweet_content') as string

    await postTweet(content)
    formRef.current?.reset()
  }
  return (
    <form ref={formRef} className='flex p-3 gap-1 border-[1px] border-gray-500 relative w-full'onSubmit={handleSubmit} >
      <div className='flex'>
        <picture className='rounded-full size-10 bg-gray-700 object-contain '>
          <img className='rounded-full h-full w-full' src={profileImage} alt="profile user image" />
        </picture>
      </div>
      <div className='w-full flex flex-col'>
        <textarea className='bg-inherit  border-dotted p-1' placeholder='What`s happen' name="tweet_content" rows={10}/>
        <button className='rounded-full bg-blue-600 w-fit p-2 self-end mr-4 my-4'>Post tweet</button>
      </div>
    </form>
  )
}

export default InputTweets
