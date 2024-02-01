'use client'

import { updateProfilePhoto } from '../lib/postActions'
import { IconUser } from '@tabler/icons-react'
import { useState } from 'react'

const ProfileImage = ({ avatar }: { avatar: string }) => {
  const [openUploadImage, setOpenUploadImage] = useState(false)
  return (
    <>
      <picture className=' relative rounded-full bg-gray-700 w-32 h-32 -translate-y-16 object-contain'>
        <button onClick={() => { setOpenUploadImage(true) }} className=' absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-full '>
          {avatar === null ? <IconUser size={'50px'}/> : <img src={avatar} alt={avatar} className='rounded-full h-full'/>}</button>
      </picture>
      <div className={`${!openUploadImage ? 'hidden' : 'absolute h-[2000px] w-[1000px] -translate-x-44 flex backdrop-blur-lg z-10'}`}>
        <form className= 'flex justify-center flex-col backdrop-blur-xl bg-white/30 h-fit translate-x-[400px] translate-y-[400px] w-fit py-3 rounded-md px-5 gap-3 ' action={async (formData) => {
          await updateProfilePhoto(formData)
        }}>
          <button className='self-end' onClick={() => { setOpenUploadImage(false) }}>X</button>
          <label htmlFor="">Upload your url image</label>
          <input type="text" name='avatar_url' />
          <button type='submit' onClick={() => { setOpenUploadImage(false) }} className='py-1 w-fit flex self-center px-3 bg-slate-600 rounded-full'>upload image</button>
        </form>
      </div>
    </>
  )
}

export default ProfileImage
