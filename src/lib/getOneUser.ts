import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'

export async function getOneUser (id: number): Promise<any> {
  const userData = await getServerSession()
  const cookie: string | null = headers().get('cookie')
  const header = new Headers()
  if (typeof (cookie) === 'string') header.set('Cookie', cookie)

  if (userData !== undefined) {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'GET',
      headers: header
    })

    const userData = await res.json()
    return userData
  } else {
    return null
  }
}
