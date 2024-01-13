'use client'

import useGetUserInfo from '@/hooks/useGetUserInfo'
import { IconArrowNarrowLeft, IconUser } from '@tabler/icons-react'
import { useState } from 'react'

const ProfileHeader = ({ tweets }: { tweets: any }) => {
  const [uploadImage, setUploadImage] = useState(false)
  const { user }: { user: any } = useGetUserInfo({ uploadImage, tweets })

  if (user) {
    const [year, month, day] = user.birthday.split('-')
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const birthday = `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`

    const handleSubmit = async (e: any) => {
      e.preventDefault()
      if (e.target[1].value !== '') {
        const res = await fetch('/api/upload-avatar', {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(e.target[1].value)
        })

        const data = await res.json()
        console.log(data)
        if (data) {
          e.target[1].value = ''
          setUploadImage(false)
        } return null
      } return null
    }

    return (
      <header className='border-x-2 border-gray-500  w-full'>
        <div className={`${!uploadImage ? 'hidden' : 'absolute h-[2000px] w-[1000px] -translate-x-44 flex backdrop-blur-lg z-10'}`}>
          <form onSubmit={handleSubmit} className= 'flex justify-center flex-col backdrop-blur-xl bg-white/30 h-fit translate-x-[400px] translate-y-[400px] w-fit py-3 rounded-md px-5 gap-3 ' action="">
            <button type='button' onClick={() => { setUploadImage(false) }} className='flex self-end'>x</button>
            <label htmlFor="">Upload your url image</label>
            <input type="text" name='avatar_url' />
            <button type='submit' className='py-1 w-fit flex self-center px-3 bg-slate-600 rounded-full'>upload image</button>
          </form>
        </div>
        <div className='flex justify-start gap-5 px-4'>
          <div><IconArrowNarrowLeft /></div>
          <div className='flex flex-col justify-start'>
            <h3 className='text-xl font-bold'>{user?.full_name}</h3>
            <p className='text-slate-300/60 text-sm'>{user?.tweets.length} posts</p>
          </div>
        </div>
        <div className='w-full'>
          <div className='bg-gray-700/60 h-[200px]'>
            <picture className='w-full'></picture>
          </div>
          <div className='flex justify-between px-4 h-[100px]'>
            <picture className=' relative rounded-full bg-gray-700 w-32 h-32 -translate-y-16 object-contain'>
              <button onClick={() => { setUploadImage(true) }} className=' absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 w-full '>
                {user?.avatar_url === null ? <IconUser size={'50px'}/> : <img src={user?.avatar_url} alt={user?.avatar_url} className='rounded-full '/>}</button>
            </picture>

            <button className='flex mt-3 rounded-full border-gray-700 border-2 h-fit px-5 py-1'>Edit profile</button>
          </div>
        </div>
        <div className='flex flex-col gap-3 px-4'>
          <div>
            <h3 className='text-xl font-bold'>{user?.full_name}</h3>
            <p className='text-slate-300/60 text-base'>@{user?.user_nick}</p>
          </div>
          <div>description</div>
          <div className='flex gap-3 flex-wrap justify-start [&>p]:text-slate-300/60 [&>p]:text-base [&>p]:'>
            <p>Buenos Aires, Argentina</p>
            <p>Birthday: {birthday}</p>
            <p>Joined in {user?.created_at.split('T')[0]}</p>
          </div>
          <div className='flex gap-6 [&>p]:text-slate-300/60 [&>p]:text-base' >
            <p>
              <strong className='text-white'>{user?.following.length}</strong> Following
            </p>
            <p>
              <strong className='text-white'>{user?.followers.length}</strong> Followers
            </p>
          </div>
        </div>
        <div >
          <ul className='flex mt-3 [&>li]:flex-1 [&>li]:text-center items-center [&>li]:p-3 [&>li]:'>
            <li className='hover:bg-white/10 cursor-pointer transition'>Posts</li>
            <li className='hover:bg-white/10 cursor-pointer transition'>Responses</li>
            <li className='hover:bg-white/10 cursor-pointer transition'>Saved</li>
            <li className='hover:bg-white/10 cursor-pointer transition'>Photos</li>
            <li className='hover:bg-white/10 cursor-pointer transition'>Likes</li>
          </ul>
        </div>
      </header>
    )
  }
}

export default ProfileHeader
