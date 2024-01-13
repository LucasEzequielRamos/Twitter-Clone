import { type NextRequest, NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import db from '@/../utils/db'

export async function PUT (req: NextRequest) {
  try {
    const body = await req.json()
    console.log({ body })
    const session = await getServerSession()
    if (!session) throw new Error('session not found')

    const userFound = await db.users.update({
      where: {
        email_address: session?.user?.email
      },
      data: {
        avatar_url: body
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
