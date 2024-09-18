import Form from '@/app/auth/login/form'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
const LoginPage = async () => {
  const session = await getServerSession()
  console.log(session, 'aqui veo desde login')
  if (session) {
    redirect('/home')
  }
  return (
    <Form/>
  )
}

export default LoginPage
