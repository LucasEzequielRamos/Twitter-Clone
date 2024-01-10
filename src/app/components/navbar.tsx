'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const { data: session } = useSession()
  // console.log(session)
  return (
    <nav className='flex justify-between px-5 py-5'>
      <div><h3>TWITTER CLONE</h3></div>
      {!session
        ? <div className='flex gap-3'>
          <Link href={'/auth/login'}>Login</Link>
          <Link href={'/auth/register'}>Register</Link>
        </div>
        : <div>
          <button onClick={async () => { await signOut() }}>Sign out</button>
        </div>
      }
    </nav>
  )
}

export default Navbar
