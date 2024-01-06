'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

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
  const [error, setError] = useState('')

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      redirect: false,
      email_address: user?.email_address,
      password: user?.password
    })
    console.log(res)
    if (res?.status === 200) {
      router.push('/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <section className='h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-7 bg-slate-700 py-4 px-8 rounded-lg  items-center'>
        <h2 className='text-2xl'>Sign in your account in Twitter Clone</h2>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4 [&>input]:p-1 [&>input]:w-4/5 items-center'>
          <input onChange={handleChange} type="text" placeholder="email_address" name="email_address" />
          <input onChange={handleChange} type="password" placeholder="password" name="password" />
          <button className='text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2 w-1/3'>Register</button>
          {error && <p className='text-base text-red-700'>{error}</p>}
        </form>
        <p className='text-xl'>- OR -</p>
        <Link className='text-blue-600' href={'/register'}>Register here</Link>
      </div>
    </section>
  )
}

export default Form
