'use client'

import { useSession } from 'next-auth/react'
import Form from './form'
import { redirect } from 'next/navigation'

const RegisterPage = () => {
  const session = useSession()

  if (session.status !== 'unauthenticated') {
    redirect('/auth/login')
  }
  return (
    <Form/>
  )
}

export default RegisterPage
