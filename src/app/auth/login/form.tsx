'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Form = () => {
  const [error, setError] = useState<string | null | undefined>(null)
  const route = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const res = await signIn('credentials', {
      email_address: formData.get('email_address'),
      password: formData.get('password'),
      redirect: false
    })
    if (res?.status !== 200) {
      setError(res?.error)
    } else {
      route.push('/home')
    }
  }

  return (
    <section className='h-screen  flex justify-center items-center'>
      <div className='flex flex-col gap-7 bg-slate-700 py-4 px-8 mx-2 rounded-lg  items-center'>
        <h2 className='text-2xl'>Sign in your account in Twitter Clone</h2>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4 [&>input]:p-1 [&>input]:w-4/5 items-center'>
          <input type="text" placeholder="email_address" name="email_address" />
          <input type="password" placeholder="password" name="password" />
          <button className='text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2 w-1/3'>Login  </button>
          {error && <p className='text-base text-red-700'>{error}</p>}
        </form>
        <p className='text-xl'>- OR -</p>
        <Link className='text-blue-600' href={'/auth/register'}>Register here</Link>
      </div>
    </section>
  )
}

export default Form
