import { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
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
    console.log(data)

    router.push('/')
  }
  return (
    <div>
        <h2>Sign in for enjoy your twitter clone</h2>
        <form onSubmit={} action="">
            <label htmlFor="email_address"></label>
            <input onChange={handleChange} type="text" name='email_address' />
            <label htmlFor="password"></label>
            <input onChange={handleChange} type="text" name='password' />
        </form>
    </div>
  )
}

export default page
