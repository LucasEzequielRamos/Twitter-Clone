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
    <section className="w-full m-auto flex flex-col justify-center px-10 py-4 max-w-xl mb-4 lg:flex-row lg:justify-between lg:max-w-none">
      <Logo/>

      <div className='mr-4'>
        <h1 className='text-slate-100 text-4xl font-extrabold my-8 sm:text-6xl lg:text-7xl'>Happening now</h1>
        <h3 className='text-slate-100 text-2xl mb-6 font-extrabold sm:text-3xl'>Join today.</h3>
  
        <Button text='Sign up with Google' white txtBlack icon={<GoogleIcon/>} />
        <Button text='Sign up with Apple' white txtBlack icon={<AppleIcon/>} />
  
        <div className='flex items-center my-2'>
          <div className='bg-[#2f3336] h-px min-w-36 my-2'></div>
          <span className='mx-2'>or</span>
          <div className='bg-[#2f3336] h-px min-w-36 my-2'></div>
        </div>

        <Button text='Create account' secondary txtWhite />

        <p className='text-slate-500 text-xs w-80 leading-3 mt-1 mb-10'>By signing up, you agree to the <span className='text-secondary'>Terms of Service</span> and <span className='text-secondary'>Privacy Policy</span>, including <span className='text-secondary'>Cookie Use</span>.</p>
      
        <h5 className='font-semibold my-4'>Already have an account?</h5>

        <Button text='Sign in' transparent txtSecondary border />

      </div>
    </section>
  )
}

export default page
