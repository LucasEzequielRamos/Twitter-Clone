import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'

export async function fetchUserInfo (): Promise<any> {
  const userData = await getServerSession()
  const cookie: string | null = headers().get('cookie')
  const header = new Headers()
  if (cookie) header.append('Cookie', cookie)
  console.log(header, 'headeeeeeeeeeeer')
  console.log(cookie, ' cokieeeeeeeeeeeeeeee')
  if (userData !== undefined) {
    const res = await fetch('https://twitter-clone-theta-bay.vercel.app/api/users', {
      method: 'GET',
      headers: header
    })

    console.log(await res.json(), ' res desde fetchUserInfo')
    const userData = await res.json()
    return userData
  } else {
    return null
  }
}
