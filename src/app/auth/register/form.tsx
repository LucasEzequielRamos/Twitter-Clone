'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  user_nick?: string
  email_address?: string
  first_name?: string
  last_name?: string
  phonenumber?: number
  password?: string
}

const Form = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    const data = await res.json()
    if (!data.message) {
      router.push('/auth/login')
    }
  }

  return (
    <section className='h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-7 bg-slate-700 py-4 px-8 rounded-lg justify-center'>
        <h2 className='text-2xl'>Create your account in Twitter Clone</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 [&>input]:p-1 [&>input]:w-4/5 items-center'>
          <input onChange={handleChange} type="text" placeholder="user_nick" name="user_nick" required />
          <input onChange={handleChange} type="text" placeholder="email_address" name="email_address" required />
          <input onChange={handleChange} type="text" placeholder="full_name" name="full_name" required/>
          <input onChange={handleChange} type="number" placeholder="phonenumber" name="phonenumber" />
          <input onChange={handleChange} type="password" placeholder="password" name="password" required />
          <input onChange={handleChange} type="date" placeholder="birthday" name="birthday" required />
          <button className='text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2 w-1/3'>Register</button>
        </form>
      </div>
    </section>
  )
}

export default Form
