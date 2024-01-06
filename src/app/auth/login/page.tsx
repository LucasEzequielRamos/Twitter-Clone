'use client'

import Form from '@/auth/login/form'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
const LoginPage = () => {
  const session = useSession()

  if (session.status !== 'unauthenticated') {
    redirect('/auth/login')
  }
  return (
    <Form/>
  )
}

export default LoginPage
