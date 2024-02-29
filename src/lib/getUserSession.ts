import { getServerSession } from 'next-auth'
import type { NextApiRequest } from 'next'

export async function fetchUserInfo (req: NextApiRequest): Promise<any> {
  const userData = await getServerSession()
  const header = new Headers()

  if (userData !== undefined) {
    const cookie: string | null = req.headers.cookie ?? ''
    if (typeof (cookie) === 'string') header.set('Cookie', cookie)
    console.log(header, 'headeeeeeeeeeeer')
    console.log(cookie, ' cokieeeeeeeeeeeeeeee')
    const res = await fetch('http://twitter-clone-theta-bay.vercel.app/api/users', {
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
