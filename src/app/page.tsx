import { getServerSession } from 'next-auth'

const page = async () => {
  const session = await getServerSession()
  return (
    <div>{session?.user?.name }</div>
  )
}

export default page
