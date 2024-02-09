import Form from '@/app/auth/login/form'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
const LoginPage = async () => {
  const session = await getServerSession()
  console.log(session)
  if (session) {
    redirect('/dashboard')
  }
  return (
    <Form/>
  )
}

export default LoginPage
