'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const { data: session } = useSession()
  return (
    <header className='sticky top-0 backdrop-blur-sm bg-inherit/5 w-[600px] m-auto z-30 border-b-[1px] border-x-[1px] border-gray-500'>
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
    </header>
  )
}

export default Navbar
