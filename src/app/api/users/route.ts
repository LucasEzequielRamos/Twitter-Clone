import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession as nextAuthGetServerSession } from 'next-auth'
import db from '@/../utils/db'
import { authOptions } from '../../../utils/auth-options'

export async function GET (request: NextRequest, response: NextResponse) {
  try {
    const req = {
      headers: Object.fromEntries(request.headers),
      cookies: Object.fromEntries(
        request.cookies.getAll().map((c) => [c.name, c.value])
      )
    }
    const res = { getHeader () {}, setCookie () {}, setHeader () {} }

    const session = await nextAuthGetServerSession(
      req as any,
      res as any,
      authOptions
    )
    console.log(session)
    if (!session) throw new Error('session not found')

    const userFound = await db.users.findUnique({
      where: {
        email_address: session?.user?.email
      },
      include: {
        tweets: true,
        followers: true,
        following: true
      }
    })

    return NextResponse.json(userFound, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      message: error.message
    }, { status: 500 })
  }
}
