import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'

export async function getOneUser (id: number): Promise<any> {
  try {
    const userData = await getServerSession()
    const cookie: string | null = headers().get('cookie')
    const header = new Headers()
    if (cookie) header.append('Cookie', cookie)

    if (userData !== undefined) {
      const res = await fetch(`https://twitter-clone-theta-bay.vercel.app/api/users/${id}`, {
        method: 'GET',
        headers: header
      })

      const userData = await res.json()
      return userData
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}
