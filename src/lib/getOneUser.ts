import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'

export async function getOneUser (id: number): Promise<any> {
  const userData = await getServerSession()
  if (userData !== undefined) {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'GET',
      headers: {
        Cookie: headers().get('cookie')
      }
    })

    const userData = await res.json()
    return userData
  } else {
    return null
  }
}