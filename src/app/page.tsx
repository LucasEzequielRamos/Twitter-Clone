'use client'

import { useState } from 'react'

interface user {
  user_nick?: string
  email_address?: string
  first_name?: string
  last_name?: string
  phonenumber?: number
  password?: string
}

export default function Home () {
  const [user, setUser] = useState<user | null>(null)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUser({
      ...user,
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
      body: JSON.stringify(user)
    })

    const data = await res.json()
    console.log(user)
    console.log(data)
  }

  return (
    <main >
      <form onSubmit={handleSubmit} className='[&>input]:text-black'>
          <input onChange={handleChange} type="text" placeholder="user_nick" name="user_nick" />
          <input onChange={handleChange} type="text" placeholder="email_address" name="email_address" />
          <input onChange={handleChange} type="text" placeholder="first_name" name="first_name" />
          <input onChange={handleChange} type="text" placeholder="last_name" name="last_name" />
          <input onChange={handleChange} type="number" placeholder="phonenumber" name="phonenumber" />
          <input onChange={handleChange} type="text" placeholder="password" name="password" />
          <button>Registrarse</button>
      </form>
    </main>
  )
}
