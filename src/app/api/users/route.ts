import { type NextRequest, NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import db from '@/../utils/db'

export async function GET (req: NextRequest) {
  try {
    const session = await getServerSession()
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
