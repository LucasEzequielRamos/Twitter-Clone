'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

const FormPasswordForGoogle = () => {
  const [userPassword, setUserPassword] = useState({})
  const { data: session } = useSession()

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserPassword({

      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userPassword)
    })

    const data = await res.json()
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="password"> Password</label>
        <input onChange={handleChange} type="text" name='password' />
        <label htmlFor="confirm-password"> Password</label>
        <input onChange={handleChange} type="text" name='confirm-password' />
    </form>
  )
}

export default FormPasswordForGoogle
