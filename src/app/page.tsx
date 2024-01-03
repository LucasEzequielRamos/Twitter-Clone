import AuthButton from '@/app/components/auth-button'
import Link from 'next/link'

export default function Home () {
  return (
    <main >
      <div>
        <h1>Welcome to the best twitter clone</h1>
        <Link href={'/register'}>Register</Link>
        <AuthButton/>
      </div>
    </main>
  )
}
