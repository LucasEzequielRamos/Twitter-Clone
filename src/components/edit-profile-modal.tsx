'use client'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

const EditProfileModal = () => {
  const [openModal, setOpenModal] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [file, setFile] = useState<File | null | undefined>(null)
  const form = useRef(null)
  const route = useRouter()

  const handleChange = (e: any) => {
    setProfile({
      ...profile,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!profile) return
    const formData = new FormData()
    formData.append('user_nick', profile.user_nick)
    formData.append('phonenumber', profile.phonenumber)
    formData.append('description', profile.description)
    formData.append('birthday', profile.birthday)
    formData.append('full_name', profile.full_name)
    if (file) formData.append('image', file)

    const res = await fetch('/api/users', {
      method: 'PUT',
      body: formData
    })
    console.log(await res.json())

    form.current?.reset()
    route.refresh()
    setOpenModal(false)
  }

  return (
    openModal
      ? <div className='absolute flex justify-center items-center'>
        <form ref={form} onSubmit={handleSubmit} className=' relative z-30  flex w-[565px] flex-col gap-4 [&>input]:rounded-lg [&>input]:text-black [&>label]:flex [&>label]:flex-col [&>input]:px-2 [&>input]:outline-none bg-blue-950 p-4'>
          <div className='flex justify-end'>
            <button className='size-6 rounded-sm bg-red-600' onClick={() => {
              setProfile(null)
              setOpenModal(false)
            }}>X</button>
          </div>
          <div className='flex [&>label]:w-1/2 [&>label>input]:px-2 [&>label>input]:w-11/12'>
            <label htmlFor="">
            Edit your nickname
              <input name='user_nick' type="text" onChange={handleChange} />
            </label>
            <label htmlFor="">
            Edit your phone number
              <input name='phonenumber' type="number" onChange={handleChange} />
            </label>
          </div>
          <div className=''>
            <label className='flex flex-col' htmlFor="">
            Edit your description profile
              <textarea className='text-black' rows={5} name='description' onChange={handleChange}/>
            </label>
          </div>
          <div className='flex [&>label]:w-1/2 [&>label>input]:px-2 [&>label>input]:w-11/12'>
            <label htmlFor="">
            Edit your name
              <input name='full_name' type="text" onChange={handleChange}/>
            </label>
            <label htmlFor="">
            Edit your birthday
              <input name='birthday' type="date" onChange={handleChange}/>
            </label>
          </div>
          <div >
            <label className='flex flex-col gap-2 justify-center items-center' htmlFor="">
            Edit your avatar
              <input name='avatar_url' type="file" onChange={(e) => {
                setFile(e.target.files?.[0])
              }}/>
            </label>
          </div>
          {file && (
            <img
              className="w-full h-full"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}
          <button className={`p-2 rounded-md bg-slate-700 w-1/3 mx-auto ${!profile && 'opacity-60 cursor-default'} `}>Edit</button>
        </form>
      </div>
      : <button onClick={() => { setOpenModal(true) }} className='flex mt-3 rounded-full border-gray-700 border-2 h-fit px-5 py-1'>Edit profile</button>
  )
}

export default EditProfileModal
