import Button from '@/components/button'
import Logo from '@/components/logo'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import GoogleIcon from '@/components/google-icon'
import AppleIcon from '@/components/apple-icon'

const page = async () => {
  const session = await getServerSession()
  console.log(session, 'aqui veo desde root')
  if (session) redirect('/home')
  return (
    <section className="lg:w-[600px] w-full m-auto flex flex-col justify-center p-5 max-w-xl mb-4">
      <Logo/>

      <h1 className='text-slate-100 text-6xl font-extrabold leading-12 my-12 max-w-md'>Happening now</h1>
      <h3 className='text-slate-100 text-3xl mb-8 font-extrabold leading-9'>Join today.</h3>

      <Button text='Sign up with Google' color='white' textColor='black' icon={<GoogleIcon/>} />
      <Button text='Sign up with Apple' color='white' textColor='black' icon={<AppleIcon/>} />

      <div className='flex items-center my-2'>
        <div className='bg-[#2f3336] h-px min-w-36 my-2'></div>
        <span className='mx-2'>or</span>
        <div className='bg-[#2f3336] h-px min-w-36 my-2'></div>
      </div>

      <Button text='Create account' color='secondary' textColor='white' />

      <p className='text-slate-500 text-xs w-80 leading-3 mt-1 mb-10'>By signing up, you agree to the <span className='text-secondary'>Terms of Service</span> and <span className='text-secondary'>Privacy Policy</span>, including <span className='text-secondary'>Cookie Use</span>.</p>
      
      <h5 className='font-semibold my-4'>Already have an account?</h5>

      <Button text='Sign in' color='transparent' textColor='secondary' border />


    </section>
  )
}

export default page
