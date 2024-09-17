import Logo from '@/components/logo'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getServerSession()
  console.log(session, 'aqui veo desde root')
  if (session) redirect('/home')
  return (
    <section className="lg:w-[600px] w-full m-auto flex flex-col justify-center p-5 max-w-xl">
      <Logo/>

      <h1 className='text-slate-100 text-6xl font-extrabold leading-12 my-12 max-w-md'>Happening now</h1>
      <h3 className='text-slate-100 text-3xl mb-8 font-extrabold leading-9'>Join today.</h3>

    </section>
  )
}

export default page
