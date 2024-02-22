import { type NextRequest, NextResponse } from 'next/server'
import db from '@/utils/db'
import { authOptions } from '@/utils/auth-options'
import { getServerSession as nextAuthGetServerSession } from 'next-auth'

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session: any = await nextAuthGetServerSession(authOptions)
    if (!session) throw new Error('session not found')

    const userId = params.id

    const userFound = await db.users.findUnique({
      where: {
        id: Number(userId)
      },
      include: {
        tweets: true,
        followers: true,
        following: true,
        likes: true
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
