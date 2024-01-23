import { getServerSession } from 'next-auth'

export async function getSession () {
  const session = await getServerSession()
  console.log(session)
  return session
}
