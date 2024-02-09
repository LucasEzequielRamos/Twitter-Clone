'use client'
import { useState } from 'react'

const EditProfileModal = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    openModal
      ? <div className='absolute flex justify-center items-center'>
        <form action="" className=' relative z-30 flex w-[565px] flex-col gap-4 [&>label]:flex [&>label]:flex-col bg-gray-800 p-4'>
          <button onClick={() => { setOpenModal(false) }}>X</button>
          <label className='' htmlFor="">
            Edit your nickname
            <input name='user_nick' type="text" />
          </label>
          <label htmlFor="">
            Edit your phone number
            <input name='phonenumber' type="text" />
          </label>
          <label htmlFor="">
            Edit your avatar
            <input name='avatar_url' type="text" />
          </label>
          <label htmlFor="">
            Edit your description profile
            <input name='description' type="text" />
          </label>
          <label htmlFor="">
            Edit your name
            <input name='full_name' type="text" />
          </label>
          <label htmlFor="">
            Edit your birthday
            <input name='birthday' type="text" />
          </label>
          <button>Edit</button>
        </form>
      </div>
      : <button onClick={() => { setOpenModal(true) }} className='flex mt-3 rounded-full border-gray-700 border-2 h-fit px-5 py-1'>Edit profile</button>
  )
}

export default EditProfileModal
