'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface userPassword {
  password: string
  confirm_password: string
}

const FormPasswordForGoogle = () => {
  const [userPassword, setUserPassword] = useState<userPassword>({ password: '', confirm_password: '' })
  const [error, setError] = useState<string>('')
  const { data: session } = useSession()
  const router = useRouter()

  const user = {
    user_nick: session?.user?.name?.split(' ')[0] + crypto.randomUUID(),
    email_address: session?.user?.email,
    first_name: session?.user?.name?.split(' ')[0],
    last_name: session?.user?.name?.split(' ')[1],
    phonenumber: null,
    password: userPassword.password

  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserPassword({
      ...userPassword,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(userPassword.password, userPassword.confirm_password)

    if (userPassword.password !== userPassword.confirm_password) {
      console.log('first')
      return
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await res.json()
    if (!data.message) {
      router.push('/')
    } else {
      setError('user email already in use')
    }
  }

  return (
    <div className='w-full flex justify-center items-center h-screen flex-col gap-10'>

    <form className=' w-1/4 gap-4 flex flex-col [&>input]:text-black' onSubmit={handleSubmit}>
        <label htmlFor="password"> Password</label>
        <input onChange={handleChange} type="text" name='password' />
        <label htmlFor="confirm_password">Confirm password</label>
        <input onChange={handleChange} type="text" name='confirm_password' />
        <button>send</button>
    </form>
    {error && (
        <p>{error}</p>
    )}
    </div>
  )
}

export default FormPasswordForGoogle
