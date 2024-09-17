import { getServerSession } from 'next-auth'
import Form from '@/app/auth/register/form'
import { redirect } from 'next/navigation'

const RegisterPage = async () => {
  const session = await getServerSession()
  if (session) {
    redirect('/home')
  }
  return (
    <Form/>
  )
}

export default RegisterPage
