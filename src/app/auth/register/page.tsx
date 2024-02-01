import { getServerSession } from 'next-auth'
import Form from './form'
import { redirect } from 'next/navigation'

const RegisterPage = async () => {
  const session = await getServerSession()
  console.log(session)
  if (session) {
    redirect('/dashboard')
  }
  return (
    <Form/>
  )
}

export default RegisterPage
