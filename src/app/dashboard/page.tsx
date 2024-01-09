'use client'

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
const Dashboard = () => {
  const session = useSession()
  console.log({ session })
  if (session.status === 'unauthenticated') {
    redirect('/auth/login')
  }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
