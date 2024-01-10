'use client'

import { useSession } from 'next-auth/react'
import Form from './form'
import { redirect } from 'next/navigation'

const RegisterPage = () => {
  const session = useSession()

  console.log({ session })

  if (session.status !== 'unauthenticated') {
    redirect('/dashboard')
  }
  return (
    <Form/>
  )
}

export default RegisterPage
